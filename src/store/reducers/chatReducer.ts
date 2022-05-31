import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ChatMessageType} from '../types/chat'
import {Nullable} from '../../types'

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
        addChatText(state, action: PayloadAction<{ text: string, url: Nullable<string>, author: string }>) {
            const chatMessage: ChatMessageType = {
                author: action.payload.author,
                text: action.payload.text,
                url: action.payload.url,
            }
            state.chatMessages.push(chatMessage)
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {addChatText} = chatSlices.actions

export type InitialChatStateType = typeof initialState