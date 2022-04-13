export type PostType = { id: number, message: string, likesCount: number }
export type DialogType = { id: number, name: string }
export type MessageType = { id: number, message: string }
export type FriendDataType = { id: number, name: string }
export type ProfilePageType = {
    posts: PostType[]
    postText: string
}
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
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
    addPost: () => void
    updatePostText: (postText: string) => void
}

export const store: RootStoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: '1 post', likesCount: 20},
                {id: 2, message: '2 post', likesCount: 1},
                {id: 3, message: '3 post', likesCount: 55},
            ],
            postText: ''
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
            ]
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
    addPost() {
        this._state.profilePage.posts.push({
            id: new Date().getTime(),
            message: this._state.profilePage.postText,
            likesCount: 0
        })
        this._state.profilePage.postText = ''
        this._subscriber(this._state)
    },
    updatePostText(postText) {
        this._state.profilePage.postText = postText
        this._subscriber(this._state)
    }
}



