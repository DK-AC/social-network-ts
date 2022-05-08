import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const SET_IS_LOADING = 'social-network/app/SET_IS_LOADING';
const SET_APP_ERROR = 'social-network/app/SET_APP_ERROR';
const SET_INITIALIZE = 'social-network/app/SET_INITIALIZE';


const initialState = {
    status: 'idle' as LoadingType,
    error: '',
    isInitialized: false,
};

export const appSlices = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state: InitialAppStateType, action: PayloadAction<{ status: LoadingType }>) {
            state.status = action.payload.status
        },
    },
})

export const appReducer = (state = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                status: action.status,
            };
        case SET_APP_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case SET_INITIALIZE:
            return {
                ...state,
                isInitialized: action.initialize,
            }
        default:
            return state;
    }
};


//actions
export const setAppStatus = (status: LoadingType) => ({type: SET_IS_LOADING, status }) as const;
export const setAppErrorAC = (error: string) => ({type: SET_APP_ERROR, error}) as const;
export const initializeApp = (initialize: boolean) => ({type: SET_INITIALIZE, initialize}) as const


//types
export type InitialAppStateType = typeof initialState

export type AppActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof initializeApp>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'