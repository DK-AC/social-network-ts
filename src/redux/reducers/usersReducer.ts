import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';

import {ParamsUserPageType, userAPI} from '../../api/userAPI';
import {handleAsyncNetworkError, handleAsyncServerAppError} from '../../utils/error-utils';

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
        setIsFollowingInProgress(state, action: PayloadAction<{ userId: number, isFollow: boolean }>) {
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
        builder.addCase(followUserTC.fulfilled, (state: InitialUsersStateType, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.userId)
            if (index !== -1) state.users[index].followed = action.payload.isFollow
        })
        builder.addCase(unfollowUserTC.fulfilled, (state: InitialUsersStateType, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.userId)
            if (index !== -1) state.users[index].followed = action.payload.isFollow
        })
    },
})

export const usersReducer_ = userSlices.reducer
export const {changeCurrentPage, setIsFollowingInProgress} = userSlices.actions


//thunks
export const setUsersTC = createAsyncThunk<{ users: UserType[], totalCount: number }, ParamsUserPageType, ThunkErrorType>('user/setUsers', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await userAPI.getUsers(params)
        thunkAPI.dispatch(setAppStatus({status: 'successful'}));
        return {users: response.items, totalCount: response.totalCount}
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const followUserTC = createAsyncThunk<{ userId: number, isFollow: boolean }, { userId: number, isFollow: boolean }, ThunkErrorType>('user/followUser', async (payload: { userId: number, isFollow: boolean }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: true}))
    try {
        const response = await userAPI.followUser(payload.userId)
        if (response.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return payload
        } else {
            thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            return handleAsyncServerAppError(response, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: false}))
    }
})
export const unfollowUserTC = createAsyncThunk<{ userId: number, isFollow: boolean }, { userId: number, isFollow: boolean }, ThunkErrorType>('user/unfollowUser', async (payload: { userId: number, isFollow: boolean }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: true}))
    try {
        const response = await userAPI.unfollowUser(payload.userId)
        if (response.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return payload
        } else {
            thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            return handleAsyncServerAppError(response, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    } finally {
        thunkAPI.dispatch(setIsFollowingInProgress({userId: payload.userId, isFollow: false}))
    }
})

//types
export type InitialUsersStateType = typeof initialState

export type UserType = {
    id: number,
    name: string,
    uniqueUrlName: string,
    photos: {
        small: string,
        large: string
    },
    status: string,
    followed: boolean
}

const followUnfollowFlow = async (payload: {
    dispatch: Dispatch,
    userId: number,
    actionCreator: any,
    apiMethod: any,
    isFollow: boolean
}) => {
    const {isFollow, actionCreator, userId, dispatch, apiMethod} = payload

    dispatch(setAppStatus({status: 'loading'}));
    dispatch(setIsFollowingInProgress({userId: userId, isFollow}));
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId, isFollow));
        dispatch(setAppStatus({status: 'successful'}));
        dispatch(setIsFollowingInProgress({userId, isFollow}));
    } else {
        dispatch(setAppStatus({status: 'failed'}));
    }
}