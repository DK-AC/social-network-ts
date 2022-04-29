const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_APP_ERROR = 'SET_APP_ERROR';


const initialAppState = {
    isLoading: 'idle' as LoadingType,
    error: '',
};

export const appReducer = (state = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case SET_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
};

//actions
export const setIsLoadingAC = (isLoading: LoadingType) => ({type: SET_IS_LOADING, isLoading}) as const;
export const setAppErrorAC = (error: string) => ({type: SET_APP_ERROR, error}) as const;

//thunks

//types
export type InitialAppStateType = typeof initialAppState

export type AppActionsType = ReturnType<typeof setIsLoadingAC> | ReturnType<typeof setAppErrorAC>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'