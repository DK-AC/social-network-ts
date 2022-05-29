import {RootStateType} from '../store'
import {LoadingType} from '../reducers/appReducer'
import {Nullable} from '../../types'

export const getAppStatus = (state: RootStateType): LoadingType => state.app.status

export const getAppError = (state: RootStateType): Nullable<string> => state.app.error

export const getAppIsInitialized = (state: RootStateType): boolean => state.app.isInitialized


