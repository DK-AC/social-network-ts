import {RootStateType} from '../store'
import {Nullable} from '../../types'
import {LoadingType} from '../types/appTypes'

export const getAppStatus = (state: RootStateType): LoadingType => state.app.status

export const getAppError = (state: RootStateType): Nullable<string> => state.app.error

export const getAppIsInitialized = (state: RootStateType): boolean => state.app.isInitialized


