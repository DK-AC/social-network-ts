import {addPostAC, ProfilePageType, profileReducer, updateNewPostTextAC} from "./reducers/profileReducer";
import {dialogReducer, DialogsPageType, sendMessageAC, updateNewMessageAC} from "./reducers/dialogReducer";
import {SideBarPageType, sideBarReducer} from "./reducers/sideBarReducer";

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sideBarPage: SideBarPageType
}

export type RootStoreType = {
    _state: StateType
    getState: () => StateType
    _subscriber: (state: StateType) => void
    subscribe: (observer: (state: StateType) => void) => void
    dispatch: (action: ActionsType) => void
}

export type ActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof updateNewMessageAC>

export const store: RootStoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: '1 post', likesCount: 20},
                {id: 2, message: '2 post', likesCount: 1},
                {id: 3, message: '3 post', likesCount: 55},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Jenya'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Dima'},
                {id: 4, name: 'Rita'},
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'let\'s go'},
                {id: 4, message: 'Stop'},
            ],
            newMessageText: ''
        },
        sideBarPage: {
            friends: [
                {id: 1, name: 'Artiom'},
                {id: 2, name: 'Dima'},
                {id: 3, name: 'Ivan'},
            ]
        }
    },
    getState() {
        return this._state
    },
    _subscriber() {
        console.log('State changed')
    },
    subscribe(observer) {
        this._subscriber = observer
    },
    dispatch(action) {
        profileReducer(this._state.profilePage, action)
        dialogReducer(this._state.dialogsPage, action)
        sideBarReducer(this._state.sideBarPage, action)
        this._subscriber(this._state)
    },
}

// @ts-ignore
window.store = store




