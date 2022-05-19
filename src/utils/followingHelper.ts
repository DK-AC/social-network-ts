import {setAppStatus} from '../redux/reducers/appReducer'
import {ResponseType, ResultCodeEnum} from '../api/instanceAPI'

import {handleAsyncServerAppError, ThunkAPIType} from './error-utils'

export const followingHelper = (thunkAPI: ThunkAPIType, response: ResponseType) => {
    if (response.resultCode === ResultCodeEnum.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'successful'}))
    } else {
        thunkAPI.dispatch(setAppStatus({status: 'failed'}))
        return handleAsyncServerAppError(response, thunkAPI)
    }
}