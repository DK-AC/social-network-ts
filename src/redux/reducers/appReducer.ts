const SET_IS_LOADING = 'SET_IS_LOADING';
const FOLLOW_IN_PROGRESS = 'FOLLOW_IN_PROGRESS';


const initialAppState = {
    isLoading: 'idle' as LoadingType,
    followingInProgress: false,
};

export const appReducer = (state = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case FOLLOW_IN_PROGRESS:
            return {...state, followingInProgress: action.followingInProgress}
        default:
            return state;
    }
};

//actions
export const setIsLoadingAC = (isLoading: LoadingType) => ({type: SET_IS_LOADING, isLoading}) as const;
export const followingInProgressAC = (followingInProgress: boolean) => (
    {type: FOLLOW_IN_PROGRESS, followingInProgress: followingInProgress}) as const;


//thunks

//types
export type InitialAppStateType = typeof initialAppState

export type AppActionsType = ReturnType<typeof setIsLoadingAC> | ReturnType<typeof followingInProgressAC>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'