import {addPostAC, ProfilePageType, profileReducer, updateNewPostTextAC} from "./reducers/profileReducer";
import {dialogReducer, DialogsPageType, sendMessageAC, updateNewMessageAC} from "./reducers/dialogReducer";
import {SideBarPageType, sideBarReducer} from "./reducers/sideBarReducer";
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

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sideBarPage: SideBarPageType
}

export type ActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof updateNewMessageAC>


// @ts-ignore
window.store = store


