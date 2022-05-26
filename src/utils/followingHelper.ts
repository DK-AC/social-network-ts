import {setAppStatus} from '../redux/reducers/appReducer'

import {ResultCode} from '../enum/resultCode'
import {ResponseType} from '../api'

import {handleAsyncServerAppError, ThunkAPIType} from './error-utils'

export const followingHelper = (thunkAPI: ThunkAPIType, response: ResponseType) => {
    if (response.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'successful'}))
    } else {
        thunkAPI.dispatch(setAppStatus({status: 'failed'}))
        return handleAsyncServerAppError(response, thunkAPI)
    }
}