import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Nullable} from '../../types'
import {LoadingType} from '../types'
import {INITIALIZED, NOT_INITIALIZED} from '../../constans'

import {authMe} from './authReducer'

const initialState = {
    status: 'idle' as LoadingType,
    error: null as Nullable<string>,
    isInitialized: NOT_INITIALIZED,
}

export const appSlices = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state: InitialAppStateType, action: PayloadAction<{ status: LoadingType }>) {
            state.status = action.payload.status
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
            state.isInitialized = INITIALIZED
        })
        builder.addCase(authMe.rejected, (state: InitialAppStateType) => {
            state.isInitialized = INITIALIZED
            state.error = null
        })
    },
})

export const appReducer = appSlices.reducer
export const {setAppError, isAppInitialized, setAppStatus} = appSlices.actions

export type InitialAppStateType = typeof initialState
