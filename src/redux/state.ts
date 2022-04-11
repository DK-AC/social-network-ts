export type PostsDataType = { id: number, message: string, likesCount: number }
export type DialogsDataType = { id: number, name: string }
export type MessagesDataType = { id: number, message: string }
export type ProfilePageType = {
    posts: PostsDataType[]
}
export type DialogsPageType = {
    dialogs: DialogsDataType[]
    messages: MessagesDataType[]
}
export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export const state: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: '1 post', likesCount: 20},
            {id: 2, message: '2 post', likesCount: 1},
            {id: 3, message: '3 post', likesCount: 55},
        ],
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
    }
}



