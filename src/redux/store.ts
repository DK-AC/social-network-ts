import {profileReducer} from "./reducers/profileReducer";
import {dialogReducer} from "./reducers/dialogReducer";
import {sideBarReducer} from "./reducers/sideBarReducer";
import {combineReducers, createStore} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const rootReducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer,
    sideBar: sideBarReducer
})

export type RootStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers)
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector


// @ts-ignore
window.store = store


