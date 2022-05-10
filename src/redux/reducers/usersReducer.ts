import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

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
        setIsFollowingInProgress(state, action: PayloadAction<{ id: number, isFetching: boolean }>) {
            state.followingInProgress = action.payload.isFetching
                ? [...state.followingInProgress, action.payload.id]
                : state.followingInProgress.filter(id => id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUsersTC.fulfilled, (state: InitialUsersStateType, action) => {
            state.users = action.payload.users
            state.totalCount = action.payload.totalCount
        })
        builder.addCase(followUserTC.fulfilled, (state: InitialUsersStateType, action) => {
            const index = state.users.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.users[index].followed = action.payload.follow
        })
        builder.addCase(unfollowUserTC.fulfilled, (state: InitialUsersStateType, action) => {
            const index = state.users.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.users[index].followed = action.payload.follow
        })
    },
})

export const usersReducer_ = userSlices.reducer
export const {changeCurrentPage, setIsFollowingInProgress} = userSlices.actions


// const followUnfollowFlow = async (payload: {
//     dispatch: Dispatch,
//     userId: number,
//     actionCreator: any,
//     apiMethod: any,
//     follow: boolean
// }) => {
//     const {follow, actionCreator, userId, dispatch, apiMethod} = payload
//
//     dispatch(setAppStatus({status: 'loading'}));
//     dispatch(followingInProgressAC(true, userId));
//     const response = await apiMethod(userId)
//     if (response.resultCode === 0) {
//         dispatch(actionCreator(userId, follow));
//         dispatch(setAppStatus({status: 'successful'}));
//         dispatch(followingInProgressAC(false, userId));
//     } else {
//         dispatch(setAppStatus({status: 'failed'}));
//     }
// }

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
export const followUserTC = createAsyncThunk<{ id: number, follow: boolean }, { id: number, follow: boolean }, ThunkErrorType>('user/followUser', async (payload: { id: number, follow: boolean }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    thunkAPI.dispatch(setIsFollowingInProgress({id: payload.id, isFetching: true}))
    try {
        const response = await userAPI.followUser(payload.id)
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
        thunkAPI.dispatch(setIsFollowingInProgress({id: payload.id, isFetching: false}))
    }
})
export const unfollowUserTC = createAsyncThunk<{ id: number, follow: boolean }, { id: number, follow: boolean }, ThunkErrorType>('user/unfollowUser', async (payload: { id: number, follow: boolean }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    thunkAPI.dispatch(setIsFollowingInProgress({id: payload.id, isFetching: true}))
    try {
        const response = await userAPI.unfollowUser(payload.id)
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
        thunkAPI.dispatch(setIsFollowingInProgress({id: payload.id, isFetching: false}))
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