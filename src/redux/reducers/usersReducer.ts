import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ParamsUserPageType, userAPI, UserType} from '../../api/userAPI';
import {handleAsyncNetworkError} from '../../utils/error-utils';
import {followingHelper} from '../../utils/followingHelper';

import {setAppStatus} from './appReducer';
import {ThunkErrorType} from './profileReducer';


const initialState = {
    users: [] as UserType[],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    followingInProgress: [] as number[],
};

export const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeCurrentPage(state: InitialUsersStateType, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
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

export const usersReducer_ = userSlices.reducer
export const {changeCurrentPage, setIsFollowingInProgress} = userSlices.actions


export const setUsersTC = createAsyncThunk<{ users: UserType[], totalCount: number }, ParamsUserPageType, ThunkErrorType>('user/setUsers', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await userAPI.getUsers(params)
        thunkAPI.dispatch(setAppStatus({status: 'successful'}));
        return {users: response.items, totalCount: response.totalCount}
    } catch (err: unknown) {
        return handleAsyncNetworkError(err as AxiosError, thunkAPI)
    }
})

export const followingTC = createAsyncThunk<FollowUnFollowPayloadType, FollowUnFollowPayloadType, ThunkErrorType>('user/followingTC', async (payload: FollowUnFollowPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: true}))
    try {
        let response
        if (!payload.isFollow) {
            response = await userAPI.unfollowUser(payload.userId)
            followingHelper(thunkAPI, response)
            return payload
        } else {
            response = await userAPI.followUser(payload.userId)
            followingHelper(thunkAPI, response)
            return payload
        }
    } catch (err: unknown) {
        return handleAsyncNetworkError(err as AxiosError, thunkAPI)
    } finally {
        thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: false}))
    }
})

export type InitialUsersStateType = typeof initialState
type FollowUnFollowPayloadType = { userId: number, isFollow: boolean }

