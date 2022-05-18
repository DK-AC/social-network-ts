import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ParamsUserPageType, userAPI, UserType} from '../../api/userAPI';
import {handleAsyncNetworkError, ThunkErrorType} from '../../utils/error-utils';
import {followingHelper} from '../../utils/followingHelper';
import {AxiosResponseType} from '../../api/instanceAPI';

import {setAppStatus} from './appReducer';


const initialState = {
    users: [] as UserType[],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    followingInProgress: [] as number[],
    portionNumber: 1,
};

export const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeCurrentPage(state: InitialUsersStateType, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
        },
        changePortionNumber(state: InitialUsersStateType, action: PayloadAction<{ portionNumber: number }>) {
            state.portionNumber = action.payload.portionNumber
        },
        setIsFollowingInProgress(state, action: PayloadAction<FollowUnFollowPayloadType>) {
            state.followingInProgress = action.payload.isFollow
                ? [...state.followingInProgress, action.payload.userId]
                : state.followingInProgress.filter(id => id !== action.payload.userId)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUsersTC.fulfilled, (state: InitialUsersStateType, action) => {
            state.users = action.payload.users
            state.totalCount = action.payload.totalCount
        })
        builder.addCase(followingTC.fulfilled, (state: InitialUsersStateType, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.userId)
            if (index !== -1) state.users[index].followed = action.payload.isFollow
        })
    },
})

export const usersReducer = userSlices.reducer
export const {changeCurrentPage, setIsFollowingInProgress, changePortionNumber} = userSlices.actions


export const setUsersTC = createAsyncThunk <{ users: UserType[], totalCount: number }, ParamsUserPageType, ThunkErrorType>
('user/setUsers',
    async (params, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
        try {
            const {data} = await userAPI.getUsers(params)
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return {users: data.items, totalCount: data.totalCount}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const followingTC = createAsyncThunk<FollowUnFollowPayloadType, FollowUnFollowPayloadType, ThunkErrorType>
('user/followingTC',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
        thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: true}))
        try {
            let data: AxiosResponseType
            if (!payload.isFollow) {
                data = await userAPI.unfollowUser(payload.userId)
                followingHelper(thunkAPI, data.data)
                return payload
            } else {
                data = await userAPI.followUser(payload.userId)
                followingHelper(thunkAPI, data.data)
                return payload
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        } finally {
            thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: false}))
        }
    })

export type InitialUsersStateType = typeof initialState
type FollowUnFollowPayloadType = { userId: number, isFollow: boolean }

