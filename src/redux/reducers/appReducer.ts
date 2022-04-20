const SET_IS_LOADING = 'SET_IS_LOADING';


const initialAppState = {
    isLoading: 'idle' as LoadingType,
};

export const appReducer = (state = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

//actions
export const setIsLoadingAC = (isLoading: LoadingType) => ({type: SET_IS_LOADING, isLoading}) as const;


//thunks

//types
export type InitialAppStateType = typeof initialAppState

export type AppActionsType = ReturnType<typeof setIsLoadingAC>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'