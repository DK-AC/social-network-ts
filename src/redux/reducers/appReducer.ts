import {Dispatch} from "redux";
import {appAPI} from "../../api/appAPI";

const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'

const initialAppState = {
    isLoading: 'idle' as LoadingType,
    isInitialized: false
}

export const appReducer = (state = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading
            }
        case "SET_IS_INITIALIZED":
            return {
                ...state, isInitialized: action.isInitialized
            }
        default:
            return state
    }
}

//actions
export const setIsLoadingAC = (isLoading: LoadingType) => ({type: SET_IS_LOADING, isLoading}) as const
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const

//thunks
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setIsInitializedAC(false))
    dispatch(setIsLoadingAC("loading"))
    return appAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsInitializedAC(true))
                dispatch(setIsLoadingAC("successful"))
            } else {
                dispatch(setIsLoadingAC("failed"))
            }
        })
}

//types
export type InitialAppStateType = typeof initialAppState

export type AppActionsType = ReturnType<typeof setIsLoadingAC> | ReturnType<typeof setIsInitializedAC>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'