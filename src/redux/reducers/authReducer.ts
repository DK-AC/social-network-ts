import {Dispatch} from "redux";
import {authAPI} from "../../api/authAPI";
import {setIsLoadingAC} from "./appReducer";

const SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'

const initialAuthState = {
    isInitialized: false
}

export const authReducer = (state = initialAuthState, action: AppActionsType): InitialAuthStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state, isInitialized: action.isInitialized
            }
        default:
            return state
    }
}


//actions
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const

//thunks
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setIsInitializedAC(false))
    dispatch(setIsLoadingAC("loading"))
    return authAPI.me()
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
export type InitialAuthStateType = typeof initialAuthState

export type AppActionsType = ReturnType<typeof setIsLoadingAC> | ReturnType<typeof setIsInitializedAC>