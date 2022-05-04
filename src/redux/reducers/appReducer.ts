const SET_IS_LOADING = 'social-network/app/SET_IS_LOADING';
const SET_APP_ERROR = 'social-network/app/SET_APP_ERROR';
const SET_INITIALIZE = 'social-network/app/SET_INITIALIZE';


const initialAppState = {
    isLoading: 'idle' as LoadingType,
    error: '',
    isInitialized: false,
};

export const appReducer = (state = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case SET_APP_ERROR:
            return {...state, error: action.error}
        case SET_INITIALIZE:
            return {...state, isInitialized: action.initialize}

        default:
            return state;
    }
};

//actions
export const setIsLoadingAC = (isLoading: LoadingType) => ({type: SET_IS_LOADING, isLoading}) as const;
export const setAppErrorAC = (error: string) => ({type: SET_APP_ERROR, error}) as const;
export const initializeApp = (initialize: boolean) => ({type: SET_INITIALIZE, initialize}) as const


//thunks

//types
export type InitialAppStateType = typeof initialAppState

export type AppActionsType =
    ReturnType<typeof setIsLoadingAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof initializeApp>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'