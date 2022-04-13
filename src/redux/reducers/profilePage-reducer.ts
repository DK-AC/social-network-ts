import {ActionsType, StateType} from "../state";

export const profilePageReducer = (state: StateType, action: ActionsType) => {
    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    posts: [...state.profilePage.posts, {
                        id: new Date().getTime(),
                        message: action.postText,
                        likesCount: 0
                    }]
                }
            }
        default:
            return state
    }
}

