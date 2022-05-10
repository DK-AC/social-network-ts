import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

export const dialogSlices = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        sendMessage(state, action: PayloadAction<{ messageText: string }>) {
            state.messages.push({id: new Date().getTime(), message: action.payload.messageText})
        },
    },
    extraReducers: {},
})
export const dialogsReducer = dialogSlices.reducer
export const {sendMessage} = dialogSlices.actions

export type initialDialogsStateType = typeof initialState

