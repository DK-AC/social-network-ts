import {Dispatch} from 'redux';
import {authAPI, AuthUserType, LoginUserType} from '../../api/authAPI';
import {setIsLoadingAC} from './appReducer';

const SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'
const SET_IS_AUTH_USER = 'SET_IS_AUTH_USER'
const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'

const initialAuthState = {
    isInitialized: false,
    id: 19179,
    login: '',
    email: '',
    password: ''
}

export const authReducer = (state = initialAuthState, action: AppActionsType): InitialAuthStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state, isInitialized: action.isInitialized
            }
        case SET_IS_AUTH_USER: {
            return {
                ...state,
                ...action.data
            }
        }
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                email: action.data.email,
                password: action.data.password,
            }
        default:
            return state
    }
}


//actions
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const
export const setIsAuthUser = (data: AuthUserType) => ({type: SET_IS_AUTH_USER, data}) as const
export const setIsLoggedInAC = (data: LoginUserType) => ({type: SET_IS_LOGGED_IN, data}) as const

//thunks
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setIsInitializedAC(false))
    dispatch(setIsLoadingAC('loading'))
    return authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuthUser(res.data.data))
                dispatch(setIsInitializedAC(true))
                dispatch(setIsLoadingAC('successful'))
            } else {
                dispatch(setIsLoadingAC('failed'))
            }
        })
}

export const loginTC = (data: LoginUserType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    return authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(res.data.data))
            dispatch(setIsLoadingAC('successful'))
            if (res.data.resultCode === 0) {
                dispatch(setIsInitializedAC(true))
            } else {
                dispatch(setIsInitializedAC(false))
            }
        })
}

//types
export type InitialAuthStateType = typeof initialAuthState

export type AppActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setIsAuthUser>