import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {profileAPI, ProfileUserType} from '../../api/profileAPI';

import {setIsLoadingAC} from './appReducer';

const ADD_POST = 'social-network/profile/ADD_POST';
const SET_PROFILE_USER = 'social-network/profile/SET_PROFILE_USER';
const GET_PROFILE_USER_STATUS = 'social-network/profile/GET_PROFILE_USER_STATUS';
const UPDATE_PROFILE_USER_STATUS = 'social-network/profile/UPDATE_PROFILE_USER_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST'


const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ],
    profile: null as ProfileUserType | null,
    status: '',
};

export const profileReducer_ = createSlice({
    name: 'profile',
    reducers: {},
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

export const profileReducer1 = profileReducer_.reducer

export const profileReducer = (state = initialState, action: ProfileActionsType): InitialProfileStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [{id: new Date().getTime(), message: action.postText, likesCount: 0}, ...state.posts],
            };
        case SET_PROFILE_USER:
            return {
                ...state,
                profile: action.profile,
            };
        case GET_PROFILE_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case UPDATE_PROFILE_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
            }
        default:
            return state;
    }
};

//actions
export const addPostAC = (postText: string) => ({type: ADD_POST, postText} as const);
export const setProfileUserAC = (profile: ProfileUserType) => ({type: SET_PROFILE_USER, profile} as const);
export const getProfileUserStatusAC = (status: string) => ({type: GET_PROFILE_USER_STATUS, status}) as const
export const updateProfileUserStatusAC = (status: string) => ({type: UPDATE_PROFILE_USER_STATUS, status}) as const
export const deletePostAC = (postId: number) => ({type: DELETE_POST, postId}) as const


//thunks
export const setProfileUserTC = createAsyncThunk<{ profile: ProfileUserType }, number, ThunkErrorType>('profile/setProfileUser',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC('loading'));
        const response = await profileAPI.getProfileUserId(userId)
        thunkAPI.dispatch(setIsLoadingAC('successful'))
        return {profile: response.data}
    })
export const getProfileUserStatusTC = createAsyncThunk<{ status: string }, number, ThunkErrorType>('profile/getProfileUserStatus', async (userId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC('loading'));
    const response = await profileAPI.getProfileUserStatus(userId)
    thunkAPI.dispatch(setIsLoadingAC('successful'))
    return {status: response.data}

})
export const updateProfileUserStatusTC = createAsyncThunk<{ status: string }, { status: string }, ThunkErrorType>
('profile/updateProfileUserStatus',
    async (status, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC('loading'));
        const response = await profileAPI.updateProfileUserStatus(status)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoadingAC('successful'))
            return status
        } else {
            thunkAPI.dispatch(setIsLoadingAC('failed'));
            return thunkAPI.rejectWithValue({errors: [], fieldsErrors: []})
        }
    })


//types
export type InitialProfileStateType = typeof initialState

export type ProfileActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setProfileUserAC>
    | ReturnType<typeof getProfileUserStatusAC>
    | ReturnType<typeof updateProfileUserStatusAC>
    | ReturnType<typeof deletePostAC>


export type ThunkErrorType = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }
export type FieldErrorType = { error: string, field: string };