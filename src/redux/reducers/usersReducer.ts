import {Dispatch} from 'redux';

import {ParamsUserPageType, userAPI} from '../../api/userAPI';

import {followingInProgressAC, setIsLoadingAC} from './appReducer';

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

const initialState = {
    users: [] as UserType[],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
};


export const usersReducer = (state: initialStateType = initialState, action: UsersActionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: true}
                    : user),
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: false}
                    : user),
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount,
            };
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        default:
            return state;
    }
};
//actions
export const followUserAC = (userId: number) => ({type: FOLLOW_USER, userId}) as const;
export const unfollowUserAC = (userId: number) => ({type: UNFOLLOW_USER, userId}) as const;
export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, users}) as const;
export const setTotalUserCountAC = (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount}) as const;
export const changeCurrentPageAC = (currentPage: number) => ({type: CHANGE_CURRENT_PAGE, currentPage}) as const;


//thunks
export const setUsersTC = (params: ParamsUserPageType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'));
    return userAPI.getUsers(params)
        .then(data => {
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUserCountAC(data.totalCount));
            dispatch(setIsLoadingAC('successful'));
        });
};
export const followUserTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(followingInProgressAC(true));
    return userAPI.followUser(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followUserAC(userId));
                dispatch(followingInProgressAC(false));
            } else {
                dispatch(setIsLoadingAC('failed'));
            }
        })
}
export const unfollowUserTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(followingInProgressAC(true));
    return userAPI.unfollowUser(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowUserAC(userId));
                dispatch(followingInProgressAC(false));
            } else {
                dispatch(setIsLoadingAC('failed'));
            }
        })
}


//types
export type UsersActionsType =
    ReturnType<typeof followUserAC>
    | ReturnType<typeof unfollowUserAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setTotalUserCountAC>
    | ReturnType<typeof changeCurrentPageAC>

type initialStateType = typeof initialState

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

export type UsersPageType = {
    users: UserType[]
    totalCount: number
    pageSize: number
    currentPage: number
}

