import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {PhotosType, profileAPI, ProfileUserType} from '../../api/profileAPI';
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils';

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
        addPost(state: InitialProfileStateType, action: PayloadAction<{ postText: string }>) {
            state.posts.unshift({id: new Date().getTime(), message: action.payload.postText, likesCount: 0})
        },
        deletePost(state: InitialProfileStateType, action: PayloadAction<{ postId: number }>) {
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
            .addCase(savePhotoTC.fulfilled, (state: InitialProfileStateType, action) => {
                state.profile!.photos = action.payload.photos
            })
            .addCase(saveProfileTC.fulfilled, (state: InitialProfileStateType, action) => {
                console.log(action.payload.profile)
                state.profile!.fullName = action.payload.profile.fullName
                state.profile!.lookingForAJob = action.payload.profile.lookingForAJob
                state.profile!.lookingForAJobDescription = action.payload.profile.lookingForAJobDescription
                state.profile!.aboutMe = action.payload.profile.aboutMe
            })
    },
})

export const profileReducer = profileSlices.reducer
export const {addPost, deletePost} = profileSlices.actions

//thunks
export const setProfileUserTC = createAsyncThunk<{ profile: ProfileUserType }, number, ThunkErrorType>('profile/setProfileUser',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
        try {
            const response = await profileAPI.getProfileUserId(userId)
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return {profile: response.data}
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })
export const getProfileUserStatusTC = createAsyncThunk<{ status: string }, number, ThunkErrorType>('profile/getProfileUserStatus', async (userId: number, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await profileAPI.getProfileUserStatus(userId)
        thunkAPI.dispatch(setAppStatus({status: 'successful'}))
        return {status: response.data}
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const updateProfileUserStatusTC = createAsyncThunk<{ status: string }, { status: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (status, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
        try {
            const response = await profileAPI.updateProfileUserStatus(status)
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                return status
            } else {
                return handleAsyncServerAppError(response.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })
export const savePhotoTC = createAsyncThunk<{ photos: PhotosType }, File, ThunkErrorType>('profile/savePhoto', async (file, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return response.data.data
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const saveProfileTC = createAsyncThunk<{ profile: ProfileUserType }, ProfileUserType, ThunkErrorType>('profile/saveProfile', async (profile, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return response.data.data
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})


//types
export type InitialProfileStateType = typeof initialState

