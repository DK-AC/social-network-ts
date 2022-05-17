import {setAppStatus} from '../redux/reducers/appReducer';
import {ResponseType} from '../api/typesAPI';

import {handleAsyncServerAppError} from './error-utils';

export const followingHelper = (thunkAPI: any, response: ResponseType) => {
    if (response.resultCode === 0) {
        thunkAPI.dispatch(setAppStatus({status: 'successful'}));
    } else {
        thunkAPI.dispatch(setAppStatus({status: 'failed'}));
        return handleAsyncServerAppError(response, thunkAPI)
    }
}