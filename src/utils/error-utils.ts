import {AxiosError} from 'axios';

import {setAppError, setAppStatus} from '../redux/reducers/appReducer'
import {ResponseType} from '../api/authAPI';

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleAsyncServerAppError = (data: ResponseType, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}
export const handleAsyncNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}