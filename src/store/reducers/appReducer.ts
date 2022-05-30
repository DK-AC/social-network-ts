import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Nullable} from '../../types'
import {LoadingType} from '../types'
import {SUCCESS_INITIALIZED, FAILED_INITIALIZED} from '../../constans'

import {authMe} from './authReducer'

const initialState = {
    appStatus: 'idle' as LoadingType,
    error: null as Nullable<string>,
    isInitialized: FAILED_INITIALIZED,
}

export const appSlices = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state: InitialAppStateType, action: PayloadAction<{ appStatus: LoadingType }>) {
            state.appStatus = action.payload.appStatus
        },
        setAppError(state: InitialAppStateType, action: PayloadAction<{ error: Nullable<string> }>) {
            state.error = action.payload.error
        },
        isAppInitialized(state: InitialAppStateType, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: builder => {
        builder.addCase(authMe.fulfilled, (state: InitialAppStateType) => {
            state.isInitialized = SUCCESS_INITIALIZED
        })
        builder.addCase(authMe.rejected, (state: InitialAppStateType) => {
            state.isInitialized = SUCCESS_INITIALIZED
            state.error = null
        })
    },
})

export const appReducer = appSlices.reducer
export const {setAppError, isAppInitialized, setAppStatus} = appSlices.actions

export type InitialAppStateType = typeof initialState
