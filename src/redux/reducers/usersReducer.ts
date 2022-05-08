import {Dispatch} from 'redux';

import {ParamsUserPageType, userAPI} from '../../api/userAPI';

import {setAppStatus} from './appReducer';

const SET_IS_FOLLOW_USER = 'social-network/users/SET_IS_FOLLOW_USER';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_TOTAL_COUNT = 'social-network/users/SET_TOTAL_COUNT';
const CHANGE_CURRENT_PAGE = 'social-network/users/CHANGE_CURRENT_PAGE';
const FOLLOW_IN_PROGRESS = 'social-network/users/FOLLOW_IN_PROGRESS';


const initialState = {
    users: [] as UserType[],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    followingInProgress: [] as number[],
};


export const usersReducer = (state = initialState, action: UsersActionsType): InitialAuthStateType => {
    switch (action.type) {
        case SET_IS_FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: action.follow}
                    : user),
            }
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
        case FOLLOW_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        default:
            return state;
    }
};


//actions
export const setIsFollowUserAC = (userId: number, follow: boolean) => (
    {type: SET_IS_FOLLOW_USER, userId, follow}) as const
export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, users}) as const;
export const setTotalUserCountAC = (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount}) as const;
export const changeCurrentPageAC = (currentPage: number) => ({type: CHANGE_CURRENT_PAGE, currentPage}) as const;
export const followingInProgressAC = (isFetching: boolean, userId: number) => (
    {type: FOLLOW_IN_PROGRESS, isFetching, userId}) as const;


const followUnfollowFlow = async (payload: {
    dispatch: Dispatch,
    userId: number,
    actionCreator: any,
    apiMethod: any,
    follow: boolean
}) => {
    const {follow, actionCreator, userId, dispatch, apiMethod} = payload

    dispatch(setAppStatus({status: 'loading'}));
    dispatch(followingInProgressAC(true, userId));
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId, follow));
        dispatch(setAppStatus({status: 'successful'}));
        dispatch(followingInProgressAC(false, userId));
    } else {
        dispatch(setAppStatus({status: 'failed'}));
    }
}

//thunks
export const setUsersTC = (params: ParamsUserPageType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    const response = await userAPI.getUsers(params)
    dispatch(setUsersAC(response.items));
    dispatch(setTotalUserCountAC(response.totalCount));
    dispatch(setAppStatus({status: 'successful'}));
};
export const followUserTC = (userId: number, follow: boolean) => async (dispatch: Dispatch) => {
    await followUnfollowFlow({
        dispatch,
        userId,
        actionCreator: setIsFollowUserAC,
        apiMethod: userAPI.followUser.bind(userId),
        follow,
    })
}
export const unfollowUserTC = (userId: number, follow: boolean) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(
        {
            dispatch,
            userId,
            actionCreator: setIsFollowUserAC,
            apiMethod: userAPI.unfollowUser.bind(userId),
            follow,
        })
}


//types
export type InitialAuthStateType = typeof initialState

export type UsersActionsType =
    | ReturnType<typeof setIsFollowUserAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setTotalUserCountAC>
    | ReturnType<typeof changeCurrentPageAC>
    | ReturnType<typeof followingInProgressAC>

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


