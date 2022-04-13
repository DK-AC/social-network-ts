import {ActionsType, ProfilePageType} from "../state";

export const profilePageReducer = (state: ProfilePageType, action: ActionsType) => {
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
        default:
            return state
    }
}

