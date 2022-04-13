export type PostType = { id: number, message: string, likesCount: number }
export type DialogType = { id: number, name: string }
export type MessageType = { id: number, message: string }
export type FriendDataType = { id: number, name: string }
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[],
    newMessageText: string
}
export type SideBarPageType = {
    friends: FriendDataType[]
}
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
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof updateNewMessageDialogAC>

export const addPostAC = () => ({type: 'ADD_POST'} as const)
export const updateNewPostTextAC = (newPostText: string) => (
    {type: 'UPDATE_NEW_POST_TEXT', newPostText} as const
)
export const addMessageAC = () => ({type: 'ADD_MESSAGE'} as const)
export const updateNewMessageDialogAC = (newMessageText: string) => (
    {type: 'UPDATE_NEW_MESSAGE_DIALOG', newMessageText} as const
)

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
        switch (action.type) {
            case 'ADD_POST':
                this._state.profilePage.posts.push({
                    id: new Date().getTime(),
                    message: this._state.profilePage.newPostText,
                    likesCount: 0
                })
                this._state.profilePage.newPostText = ''
                return this._subscriber(this._state)
            case 'UPDATE_NEW_POST_TEXT':
                this._state.profilePage.newPostText = action.newPostText
                return this._subscriber(this._state)
            case "ADD_MESSAGE":
                this._state.dialogsPage.messages.push({
                    id: new Date().getTime(),
                    message: this._state.dialogsPage.newMessageText
                })
                this._state.dialogsPage.dialogs.push({
                    id: new Date().getTime(),
                    name: 'New User'
                })
                this._state.dialogsPage.newMessageText = ''
                return this._subscriber(this._state)
            case "UPDATE_NEW_MESSAGE_DIALOG":
                this._state.dialogsPage.newMessageText = action.newMessageText
                return this._subscriber(this._state)
            default:
                return this._state
        }
    },
}



