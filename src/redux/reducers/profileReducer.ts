const initialState = {
    posts: [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ],
    newPostText: ''
}

export const profileReducer = (state = initialState, action: ProfileActionsType) => {
    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts, {
                    id: new Date().getTime(),
                    message: action.postText,
                    likesCount: 0
                }]
            }
        case "UPDATE_NEW_POST_TEXT":
            state.newPostText = action.newPostText
            return state
        default:
            return state
    }
}

export const addPostAC = (postText: string) => ({type: 'ADD_POST', postText} as const)
export const updateNewPostTextAC = (newPostText: string) => (
    {type: 'UPDATE_NEW_POST_TEXT', newPostText} as const
)

export type PostType = { id: number, message: string, likesCount: number }
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}

export type ProfileActionsType = ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC>

