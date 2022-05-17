import {setAppStatus} from '../redux/reducers/appReducer';
import {ResponseType, ResultCode} from '../api/typesAPI';

import {handleAsyncServerAppError} from './error-utils';

export const followingHelper = (thunkAPI: any, response: ResponseType) => {
    if (response.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'successful'}));
    } else {
        thunkAPI.dispatch(setAppStatus({status: 'failed'}));
        return handleAsyncServerAppError(response, thunkAPI)
    }
}