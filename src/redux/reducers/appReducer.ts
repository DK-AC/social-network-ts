const SET_IS_LOADING = 'SET_IS_LOADING'

const initialAppState = {
    loading: 'idle' as LoadingType
}

export const appReducer = (state = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state, loading: action.loading
            }
        default:
            return state
    }
}

//actions
export const setIsLoadingAC = (loading: LoadingType) => ({type: SET_IS_LOADING, loading}) as const

//types
export type InitialAppStateType = typeof initialAppState

export type AppActionsType = ReturnType<typeof setIsLoadingAC>

export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'