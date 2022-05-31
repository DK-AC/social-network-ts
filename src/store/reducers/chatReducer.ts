import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ChatMessageType} from '../types/chat'

const initialState = {
    chatMessages: [
        {url: 'https://joeschmoe.io/api/v1/random', text: 'Test', author: 'DK'},
        {url: 'https://joeschmoe.io/api/v1/random', text: 'Test2', author: 'DK2'},
        {url: 'https://joeschmoe.io/api/v1/random', text: 'Test3', author: 'DK3'},
    ] as ChatMessageType[],
}

export const chatSlices = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChatMessage(state, action: PayloadAction<{ chatMessage: string }>) {
            const chatMessage: ChatMessageType = {
                author: '12',
                text: action.payload.chatMessage,
                url: 'https://joeschmoe.io/api/v1/random',
            }
            state.chatMessages.push(chatMessage)
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {addChatMessage} = chatSlices.actions

export type InitialChatStateType = typeof initialState