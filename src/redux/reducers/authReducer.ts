import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {authAPI, AuthUserType, LoginUserType} from '../../api/authAPI';
import {handleAsyncNetworkError, handleAsyncServerAppError} from '../../utils/error-utils';

import {setAppStatus} from './appReducer';
import {ThunkErrorType} from './profileReducer';

const initialState = {
    isAuth: false,
    id: 19179,
    login: '',
    email: '',
    password: '',
};

export const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = true
        })
        builder.addCase(loginTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.email = action.payload!.user.email
            state.password = action.payload!.user.password
            state.isAuth = true
        })
        builder.addCase(logoutTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.email = ''
            state.password = ''
            state.isAuth = false
            state.login = ''
        })
    },
})

export const authReducer = authSlices.reducer

//thunks
export const authMeTC = createAsyncThunk<AuthUserType, void, ThunkErrorType>('auth/authMe', async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return response.data.data
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const loginTC = createAsyncThunk<{ user: LoginUserType }, LoginUserType, ThunkErrorType>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            await thunkAPI.dispatch(authMeTC())
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return {user: response.data.data}
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const logoutTC = createAsyncThunk<undefined, void, ThunkErrorType>('auth/logout', async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})

//types
export type InitialAuthStateType = typeof initialState
