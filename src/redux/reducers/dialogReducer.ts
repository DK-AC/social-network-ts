import {ActionsType, DialogsPageType} from "../state";

export const dialogReducer = (state: DialogsPageType, action: ActionsType) => {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: action.messageText}]
            }
        default:
            return state
    }
}