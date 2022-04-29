import {Dispatch} from 'redux';

import {authAPI, AuthUserType, LoginUserType} from '../../api/authAPI';

import {setAppErrorAC, setIsLoadingAC} from './appReducer';

const SET_IS_INITIALIZED = 'SET_IS_INITIALIZED';
const SET_IS_AUTH_USER = 'SET_IS_AUTH_USER';
const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const CLEAR_AUTH_STATE = 'CLEAR_AUTH_STATE';

const initialAuthState = {
    isAuth: false,
    id: 19179,
    login: '',
    email: '',
    password: '',
};

export const authReducer = (state = initialAuthState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state, isAuth: action.isAuth,
            }
        case SET_IS_AUTH_USER: {
            return {
                ...state,
                ...action.data,
            }
        }
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                email: action.data.email,
                password: action.data.password,
            }
        case CLEAR_AUTH_STATE:
            return {
                login: '',
                email: '',
                id: 19179,
                password: '',
                isAuth: false,
            }
        default:
            return state;
    }
};


//actions
export const setIsInitializedAC = (isAuth: boolean) => ({type: SET_IS_INITIALIZED, isAuth}) as const;
export const setIsAuthUser = (data: AuthUserType) => ({type: SET_IS_AUTH_USER, data}) as const;
export const setIsLoggedInAC = (data: LoginUserType) => ({type: SET_IS_LOGGED_IN, data}) as const;
export const clearAuthStateAC = () => ({type: CLEAR_AUTH_STATE}) as const

//thunks
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setIsInitializedAC(false));
    dispatch(setIsLoadingAC('loading'));
    return authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuthUser(res.data.data));
                dispatch(setIsInitializedAC(true));
                dispatch(setIsLoadingAC('successful'));
            } else {
                dispatch(setIsLoadingAC('failed'));
            }
        });
};

export const loginTC = (data: LoginUserType) => (dispatch: Dispatch<any>) => {
    dispatch(setIsLoadingAC('loading'));
    return authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsInitializedAC(true));
                dispatch(setIsLoggedInAC(res.data.data));
                dispatch(authMeTC())
                dispatch(setIsLoadingAC('successful'));
            } else {
                dispatch(setIsInitializedAC(false));
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setIsLoadingAC('failed'));
            }
        });
};
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'));
    return authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsInitializedAC(false));
                dispatch(clearAuthStateAC());
                dispatch(setIsLoadingAC('successful'));
            } else {
                dispatch(setIsInitializedAC(true));
                dispatch(setIsLoadingAC('failed'));
            }
        });
};

//types
export type InitialAuthStateType = typeof initialAuthState

export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setIsAuthUser>
    | ReturnType<typeof clearAuthStateAC>
