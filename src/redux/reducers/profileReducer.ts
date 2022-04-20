import {Dispatch} from 'redux';

import {profileAPI, ProfileUserType} from '../../api/profileAPI';

import {setIsLoadingAC} from './appReducer';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_PROFILE_USER = 'SET_PROFILE_USER';

const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ],
    newPostText: '',
    profile: null as ProfileUserType | null,
};

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: new Date().getTime(), message: action.postText, likesCount: 0}],
                newPostText: '',
            };
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText};
        case SET_PROFILE_USER:
            return {
                ...state,
                profile: action.profile,
            };
        default:
            return state;
    }
};

//actions
export const addPostAC = (postText: string) => ({type: ADD_POST, postText} as const);
export const updateNewPostTextAC = (newPostText: string) => (
    {type: UPDATE_NEW_POST_TEXT, newPostText} as const
);
export const setProfileUserAC = (profile: ProfileUserType) => ({type: SET_PROFILE_USER, profile} as const);


//thunks
export const setProfileUserTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'));
    return profileAPI.getProfileUserId(userId)
        .then(res => {
            dispatch(setProfileUserAC(res.data));
            dispatch(setIsLoadingAC('successful'));
        });
};

//types
type initialStateType = typeof initialState

export type PostType = { id: number, message: string, likesCount: number }
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
    profile: ProfileUserType
}

export type ProfileActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setProfileUserAC>

