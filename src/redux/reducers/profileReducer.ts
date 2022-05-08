import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {profileAPI, ProfileUserType} from '../../api/profileAPI';
import {handleAsyncNetworkError, handleAsyncServerAppError} from '../../utils/error-utils';

import {setAppStatus} from './appReducer';

const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ],
    profile: null as ProfileUserType | null,
    status: '',
};

export const profileSlices = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<{ postText: string }>) {
            state.posts.push({id: new Date().getTime(), message: action.payload.postText, likesCount: 0})
        },
        deletePost(state, action: PayloadAction<{ postId: number }>) {
            const index = state.posts.findIndex(post => post.id === action.payload.postId)
            if (index !== -1) state.posts.splice(index, 1)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setProfileUserTC.fulfilled, (state: InitialProfileStateType, action) => {
                state.profile = action.payload.profile
            })
            .addCase(updateProfileUserStatusTC.fulfilled, (state: InitialProfileStateType, action) => {
                state.status = action.payload.status
            })
            .addCase(getProfileUserStatusTC.fulfilled, (state: InitialProfileStateType, action) => {
                state.status = action.payload.status
            })
    },
})

export const profileReducer = profileSlices.reducer
export const {addPost, deletePost} = profileSlices.actions

//thunks
export const setProfileUserTC = createAsyncThunk<{ profile: ProfileUserType }, number, ThunkErrorType>('profile/setProfileUser',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'));
        try {
            const response = await profileAPI.getProfileUserId(userId)
            thunkAPI.dispatch(setAppStatus('successful'))
            return {profile: response.data}
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })
export const getProfileUserStatusTC = createAsyncThunk<{ status: string }, number, ThunkErrorType>('profile/getProfileUserStatus', async (userId: number, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const response = await profileAPI.getProfileUserStatus(userId)
        thunkAPI.dispatch(setAppStatus('successful'))
        return {status: response.data}
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const updateProfileUserStatusTC = createAsyncThunk<{ status: string }, { status: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (status, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'));
        try {
            const response = await profileAPI.updateProfileUserStatus(status)
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus('successful'))
                return status
            } else {
                return handleAsyncServerAppError(response.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })


//types
export type InitialProfileStateType = typeof initialState

export type ThunkErrorType = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }
export type FieldErrorType = { error: string, field: string };