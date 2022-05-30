import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {AxiosResponseType, userAPI} from '../../api'
import {handleAsyncNetworkError, ThunkErrorType} from '../../utils/error-utils'
import {followingHelper} from '../../utils'
import {EMPTY_STRING, FOLLOW, UNFOLLOW} from '../../constans'
import {Page} from '../../enum/page'
import {FollowUnFollowPayloadType, PayloadUsersReturnedType} from '../types'

import {ParamsUserPageType, UserType} from '../../types'

import {setAppStatus} from './appReducer'

const {INIT_TOTAL_USER_COUNT, INIT_START_PAGE, INIT_PAGE_SIZE} = Page

const initialState = {
    users: [] as UserType[],
    totalCount: INIT_TOTAL_USER_COUNT,
    pageSize: INIT_PAGE_SIZE,
    currentPage: INIT_START_PAGE,
    followingInProgress: [] as number[],
    filter: {
        term: EMPTY_STRING,
        friend: 'null' as boolean | null | string,
    },
}

export const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeCurrentPage(state: InitialUsersStateType, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
        },
        changePageSize(state: InitialUsersStateType, action: PayloadAction<{ pageSize: number }>) {
            state.pageSize = action.payload.pageSize
        },
        setIsFollowingInProgress(state, action: PayloadAction<FollowUnFollowPayloadType>) {
            state.followingInProgress = action.payload.isFollow
                ? [...state.followingInProgress, action.payload.userId]
                : state.followingInProgress.filter(id => id !== action.payload.userId)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUsers.fulfilled, (state: InitialUsersStateType, action) => {
            state.users = action.payload.users
            state.totalCount = action.payload.totalCount
            state.filter.term = action.meta.arg.term
            state.filter.friend = action.meta.arg.friend
        })
        builder.addCase(followUnfollow.fulfilled, (state: InitialUsersStateType, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.userId)
            if (index !== -1) state.users[index].followed = action.payload.isFollow
        })
    },
})

export const usersReducer = userSlices.reducer
export const {changeCurrentPage, setIsFollowingInProgress, changePageSize} = userSlices.actions


export const setUsers = createAsyncThunk<PayloadUsersReturnedType, ParamsUserPageType, ThunkErrorType>
('user/setUsers',
    async (params, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await userAPI.getUsers(params)
            const {totalCount, items} = data

            dispatch(setAppStatus({appStatus: 'successful'}))
            return {users: items, totalCount}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const followUnfollow = createAsyncThunk<FollowUnFollowPayloadType, FollowUnFollowPayloadType, ThunkErrorType>
('user/followingTC',
    async ({userId, isFollow}, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        dispatch(setIsFollowingInProgress({userId, isFollow: FOLLOW}))
        try {
            let data: AxiosResponseType

            if (!isFollow) {
                data = await userAPI.unfollowUser(userId)

                followingHelper({dispatch, rejectWithValue}, data.data)
                return {userId, isFollow}
            } else {
                data = await userAPI.followUser(userId)

                followingHelper({dispatch, rejectWithValue}, data.data)
                return {userId, isFollow}
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        } finally {
            dispatch(setIsFollowingInProgress({userId, isFollow: UNFOLLOW}))
        }
    })

export type InitialUsersStateType = typeof initialState

