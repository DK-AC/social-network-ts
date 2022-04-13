import {ActionsType} from "../store";

export type PostType = { id: number, message: string, likesCount: number }
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export const profileReducer = (state: ProfilePageType, action: ActionsType) => {
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