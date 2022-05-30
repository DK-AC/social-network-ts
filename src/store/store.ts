import {combineReducers} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'

import {appReducer, authReducer, dialogsReducer, profileReducer, sideBarReducer, usersReducer} from './reducers'


export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sideBar: sideBarReducer,
    users: usersReducer,
    app: appReducer,
    auth: authReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    devTools: process.env.NODE_ENV !== 'production',

})
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector


// @ts-ignore
window.store = store


