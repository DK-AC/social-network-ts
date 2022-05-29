import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {PhotosType, profileAPI, ProfileUserType} from '../../api'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {Nullable} from '../../types'

import {ResultCode} from '../../enum'

import {setAppStatus} from './appReducer'


const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ],
    profile: null as Nullable<ProfileUserType>,
    profileStatus: '',
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
                state.profileStatus = action.payload.profileStatus
            })
            .addCase(getProfileUserStatus.fulfilled, (state: InitialProfileStateType, action) => {
                state.profileStatus = action.payload.profileStatus
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
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUser(userId)
            dispatch(setAppStatus({status: 'successful'}))
            return {profile: data}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const getProfileUserStatus = createAsyncThunk<{ profileStatus: string }, number, ThunkErrorType>
('profile/getProfileUserStatus',
    async (userId, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUserStatus(userId)
            dispatch(setAppStatus({status: 'successful'}))
            return {profileStatus: data}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const updateProfileUserStatus = createAsyncThunk<{ profileStatus: string }, { profileStatus: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (profileStatus, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.updateProfileUserStatus(profileStatus)
            if (data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'successful'}))
                return profileStatus
            } else {
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const savePhoto = createAsyncThunk<{ photos: PhotosType }, File, ThunkErrorType>
('profile/savePhoto',
    async (file, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.savePhoto(file)
            if (data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'successful'}))
                return data.data
            } else {
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const saveProfile = createAsyncThunk<{ profile: ProfileUserType }, ProfileUserType, ThunkErrorType>
('profile/saveProfile',
    async (profile, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await profileAPI.saveProfile(profile)
            if (data.resultCode === ResultCode.Success) {
                if (profile.userId !== null) {
                    dispatch(setAppStatus({status: 'successful'}))
                    return data.data
                } else {
                    return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
                }
            } else {
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })


export type InitialProfileStateType = typeof initialState

