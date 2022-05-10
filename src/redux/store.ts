import {combineReducers} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

import {profileReducer} from './reducers/profileReducer';
import {dialogsReducer} from './reducers/dialogsReducer';
import {sideBarReducer} from './reducers/sideBarReducer';
import {usersReducer_} from './reducers/usersReducer';
import {appReducer} from './reducers/appReducer';
import {authReducer} from './reducers/authReducer';


export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sideBar: sideBarReducer,
    users: usersReducer_,
    app: appReducer,
    auth: authReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    devTools: process.env.NODE_ENV !== 'production',

});
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;


// @ts-ignore
window.store = store;


