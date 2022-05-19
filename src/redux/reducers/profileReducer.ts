import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {PhotosType, profileAPI, ProfileUserType} from '../../api/profileAPI'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {ResultCodeEnum} from '../../api/instanceAPI'

import {setAppStatus} from './appReducer'

const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ],
    profile: null as ProfileUserType | null,
    status: '',
}

export const profileSlices = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state: InitialProfileStateType, action: PayloadAction<{ postText: string }>) {
            state.posts.unshift(
                {id: new Date().getTime(), message: action.payload.postText, likesCount: 0})
        },
        deletePost(state: InitialProfileStateType, action: PayloadAction<{ postId: number }>) {
            const index = state.posts.findIndex(post => post.id === action.payload.postId)
            if (index !== -1) state.posts.splice(index, 1)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setProfileUser.fulfilled, (state: InitialProfileStateType, action) => {
                state.profile = action.payload.profile
            })
            .addCase(updateProfileUserStatus.fulfilled, (state: InitialProfileStateType, action) => {
                state.status = action.payload.status
            })
            .addCase(getProfileUserStatus.fulfilled, (state: InitialProfileStateType, action) => {
                state.status = action.payload.status
            })
            .addCase(savePhoto.fulfilled, (state: InitialProfileStateType, action) => {
                state.profile!.photos = action.payload.photos
            })
            .addCase(saveProfile.fulfilled, (state: InitialProfileStateType, action) => {
                state.profile = action.meta.arg
            })
    },
})

export const profileReducer = profileSlices.reducer
export const {addPost, deletePost} = profileSlices.actions

export const setProfileUser = createAsyncThunk<{ profile: ProfileUserType }, number, ThunkErrorType>
('profile/setProfileUser',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUser(userId)
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return {profile: data}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const getProfileUserStatus = createAsyncThunk<{ status: string }, number, ThunkErrorType>
('profile/getProfileUserStatus',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUserStatus(userId)
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return {status: data}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const updateProfileUserStatus = createAsyncThunk<{ status: string }, { status: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (status, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.updateProfileUserStatus(status)
            if (data.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                return status
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const savePhoto = createAsyncThunk<{ photos: PhotosType }, File, ThunkErrorType>
('profile/savePhoto',
    async (file, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.savePhoto(file)
            if (data.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                return data.data
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const saveProfile = createAsyncThunk<{ profile: ProfileUserType }, ProfileUserType, ThunkErrorType>
('profile/saveProfile',
    async (profile, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.saveProfile(profile)
            if (data.resultCode === ResultCodeEnum.Success) {
                if (profile.userId !== null) {
                    thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                    return data.data
                } else {
                    return handleAsyncServerAppError(data, thunkAPI)
                }
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })


export type InitialProfileStateType = typeof initialState

