import {RootStateType} from '../redux/store'

export const getAppStatus = (state: RootStateType) => state.app.status

export const getAppError = (state: RootStateType) => state.app.error

export const getAppIsInitialized = (state: RootStateType) => state.app.isInitialized


