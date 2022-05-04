import {Dispatch} from 'redux';

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
export const setProfileUserTC = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'));
    const response = await profileAPI.getProfileUserId(userId)
    dispatch(setProfileUserAC(response.data));
    dispatch(setIsLoadingAC('successful'));
};
export const getProfileUserStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'));
    const response = await profileAPI.getProfileUserStatus(userId)
    dispatch(getProfileUserStatusAC(response.data))
    dispatch(setIsLoadingAC('successful'));
}
export const updateProfileUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'));
    const response = await profileAPI.updateProfileUserStatus({status})
    if (response.data.resultCode === 0) {
        dispatch(updateProfileUserStatusAC(status))
        dispatch(setIsLoadingAC('successful'));
    } else {
        dispatch(setIsLoadingAC('failed'));
    }
}

//types
export type InitialProfileStateType = typeof initialState

export type ProfileActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setProfileUserAC>
    | ReturnType<typeof getProfileUserStatusAC>
    | ReturnType<typeof updateProfileUserStatusAC>
    | ReturnType<typeof deletePostAC>

