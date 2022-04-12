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

export const state: StateType = {
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
}

let rerenderEntireTree = (state: StateType) => {
    console.log('State changed')
}

export const addPost = () => {
    state.profilePage.posts.push({id: new Date().getTime(), message: state.profilePage.postText, likesCount: 3})
    state.profilePage.postText = ''
    rerenderEntireTree(state)
}

export const updatePostText = (postText: string) => {
    state.profilePage.postText = postText
    rerenderEntireTree(state)
}

export const subscribe = (observer: () => void) => {
    rerenderEntireTree = observer
}



