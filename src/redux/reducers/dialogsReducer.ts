const SEND_MESSAGE = "SEND_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const initialState = {
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
}

export const dialogsReducer = (state: initialStateType = initialState, action: DialogsActionsType): initialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: action.messageText}]
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessageText}
        default:
            return state
    }
}

export const sendMessageAC = (messageText: string) => ({type: SEND_MESSAGE, messageText} as const)
export const updateNewMessageAC = (newMessageText: string) => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newMessageText} as const
)
type initialStateType = typeof initialState
export type DialogType = { id: number, name: string }
export type MessageType = { id: number, message: string }
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[],
    newMessageText: string
}
export type DialogsActionsType = ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageAC>