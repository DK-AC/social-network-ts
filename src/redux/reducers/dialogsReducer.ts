const SEND_MESSAGE = 'social-network/dialogs/SEND_MESSAGE';

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
};

export const dialogsReducer = (state = initialState, action: DialogsActionsType): initialDialogsStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: action.messageText}],
            };
        default:
            return state;
    }
};

export const sendMessageAC = (messageText: string) => ({type: SEND_MESSAGE, messageText}) as const

export type initialDialogsStateType = typeof initialState

export type DialogsActionsType = ReturnType<typeof sendMessageAC>