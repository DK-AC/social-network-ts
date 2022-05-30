import {setAppStatus} from '../store/reducers/appReducer'

import {ResultCode} from '../enum'
import {ResponseType} from '../api'

import {handleAsyncServerAppError, ThunkAPIType} from './error-utils'

export const followingHelper = (thunkAPI: ThunkAPIType, response: ResponseType) => {
    if (response.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({appStatus: 'successful'}))
    } else {
        thunkAPI.dispatch(setAppStatus({appStatus: 'failed'}))
        return handleAsyncServerAppError(response, thunkAPI)
    }
}