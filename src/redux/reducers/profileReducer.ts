import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {profileAPI, ProfileUserType} from '../../api/profileAPI';

import {setIsLoadingAC} from './appReducer';

const SET_PROFILE_USER = 'social-network/profile/SET_PROFILE_USER';
const GET_PROFILE_USER_STATUS = 'social-network/profile/GET_PROFILE_USER_STATUS';
const UPDATE_PROFILE_USER_STATUS = 'social-network/profile/UPDATE_PROFILE_USER_STATUS';


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
    reducers: {
        addPost(state, action: PayloadAction<{ postText: string }>) {
            state.posts.push({id: new Date().getTime(), message: action.payload.postText, likesCount: 0})
        },
        deletePost(state, action: PayloadAction<{ postId: number }>) {
            const index = state.posts.findIndex(post => post.id === action.payload.postId)
            if (index !== -1) state.posts.splice(index, 1)
        },
    },
    initialState,
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

//actions
export const setProfileUserAC = (profile: ProfileUserType) => ({type: SET_PROFILE_USER, profile} as const);
export const getProfileUserStatusAC = (status: string) => ({type: GET_PROFILE_USER_STATUS, status}) as const
export const updateProfileUserStatusAC = (status: string) => ({type: UPDATE_PROFILE_USER_STATUS, status}) as const


//thunks
export const setProfileUserTC = createAsyncThunk<{ profile: ProfileUserType }, number, ThunkErrorType>('profile/setProfileUser',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC('loading'));
        try {
            const response = await profileAPI.getProfileUserId(userId)
            thunkAPI.dispatch(setIsLoadingAC('successful'))
            return {profile: response.data}
        } catch (e) {
            thunkAPI.dispatch(setIsLoadingAC('failed'));
            return thunkAPI.rejectWithValue({errors: [], fieldsErrors: []})
        }
    })
export const getProfileUserStatusTC = createAsyncThunk<{ status: string }, number, ThunkErrorType>('profile/getProfileUserStatus', async (userId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC('loading'));
    try {
        const response = await profileAPI.getProfileUserStatus(userId)
        thunkAPI.dispatch(setIsLoadingAC('successful'))
        return {status: response.data}
    } catch (e) {
        return thunkAPI.rejectWithValue({errors: [], fieldsErrors: []})
    }
})
export const updateProfileUserStatusTC = createAsyncThunk<{ status: string }, { status: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (status, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC('loading'));
        try {
            const response = await profileAPI.updateProfileUserStatus(status)
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setIsLoadingAC('successful'))
                return status
            } else {
                thunkAPI.dispatch(setIsLoadingAC('failed'));
                return thunkAPI.rejectWithValue({errors: [], fieldsErrors: []})
            }
        } catch (e) {
            thunkAPI.dispatch(setIsLoadingAC('failed'));
            return thunkAPI.rejectWithValue({errors: [], fieldsErrors: []})
        }
    })


//types
export type InitialProfileStateType = typeof initialState

export type ProfileActionsType =
    | ReturnType<typeof setProfileUserAC>
    | ReturnType<typeof getProfileUserStatusAC>
    | ReturnType<typeof updateProfileUserStatusAC>


export type ThunkErrorType = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }
export type FieldErrorType = { error: string, field: string };