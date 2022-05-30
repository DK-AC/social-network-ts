import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {profileAPI} from '../../api'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {Nullable, PhotosType, ProfileUserType} from '../../types'
import {ResultCode} from '../../enum'
import {EMPTY_STRING} from '../../constans'
import {PostType} from '../types/profile'

import {setAppStatus} from './appReducer'


const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ] as PostType[],
    profile: null as Nullable<ProfileUserType>,
    profileStatus: EMPTY_STRING,
}

export const profileSlices = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state: InitialProfileStateType, action: PayloadAction<{ postText: string }>) {
            const post: PostType = {id: new Date().getTime(), message: action.payload.postText, likesCount: 0}
            state.posts.unshift(post)
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
                state.profileStatus = action.payload.status
            })
            .addCase(getProfileUserStatus.fulfilled, (state: InitialProfileStateType, action) => {
                state.profileStatus = action.payload.status
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
    async (userId, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUser(userId)
            dispatch(setAppStatus({appStatus: 'successful'}))
            return {profile: data}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const getProfileUserStatus = createAsyncThunk<{ status: string }, number, ThunkErrorType>
('profile/getProfileUserStatus',
    async (userId, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUserStatus(userId)
            dispatch(setAppStatus({appStatus: 'successful'}))
            return {status: data}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const updateProfileUserStatus = createAsyncThunk<{ status: string }, { status: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (status, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await profileAPI.updateProfileUserStatus(status)
            const {resultCode} = data

            if (resultCode === ResultCode.Success) {
                dispatch(setAppStatus({appStatus: 'successful'}))
                return status
            }
            return handleAsyncServerAppError(data, {dispatch, rejectWithValue})

        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const savePhoto = createAsyncThunk<{ photos: PhotosType }, File, ThunkErrorType>
('profile/savePhoto',
    async (file, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await profileAPI.savePhoto(file)
            const {resultCode} = data

            if (resultCode === ResultCode.Success) {
                dispatch(setAppStatus({appStatus: 'successful'}))
                return data.data
            }
            return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const saveProfile = createAsyncThunk<{ profile: ProfileUserType }, ProfileUserType, ThunkErrorType>
('profile/saveProfile',
    async (profile, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await profileAPI.saveProfile(profile)
            const {resultCode} = data

            if (resultCode === ResultCode.Success) {
                if (profile.userId !== null) {
                    dispatch(setAppStatus({appStatus: 'successful'}))
                    return data.data
                }
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
            return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })


export type InitialProfileStateType = typeof initialState



