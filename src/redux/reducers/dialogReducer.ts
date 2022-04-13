import {ActionsType} from "../store";

export type DialogType = { id: number, name: string }
export type MessageType = { id: number, message: string }
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[],
    newMessageText: string
}
export const dialogReducer = (state: DialogsPageType, action: ActionsType) => {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: action.messageText}]
            }
        case "UPDATE_NEW_MESSAGE_TEXT":
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}
export const sendMessageAC = (messageText: string) => ({type: 'SEND_MESSAGE', messageText} as const)
export const updateNewMessageAC = (newMessageText: string) => (
    {type: 'UPDATE_NEW_MESSAGE_TEXT', newMessageText} as const
)