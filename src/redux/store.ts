import {profileReducer} from "./reducers/profileReducer";
import {dialogsReducer} from "./reducers/dialogsReducer";
import {sideBarReducer} from "./reducers/sideBarReducer";
import {combineReducers, compose, createStore} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sideBar: sideBarReducer
})

export type RootStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, composeEnhancers())
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector


// @ts-ignore
window.store = store


