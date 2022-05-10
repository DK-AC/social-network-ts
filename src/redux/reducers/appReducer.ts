import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {authMeTC} from './authReducer';

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
        setAppError(state: InitialAppStateType, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        isAppInitialized(state: InitialAppStateType, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: builder => {
        builder.addCase(authMeTC.fulfilled, (state: InitialAppStateType) => {
            state.isInitialized = true
        })
        builder.addCase(authMeTC.rejected, (state: InitialAppStateType) => {
            state.isInitialized = true
            state.error = ''
        })
    },
})

export const appReducer = appSlices.reducer
export const {setAppError, isAppInitialized, setAppStatus} = appSlices.actions

export type InitialAppStateType = typeof initialState
export type LoadingType = 'idle' | 'loading' | 'failed' | 'successful'