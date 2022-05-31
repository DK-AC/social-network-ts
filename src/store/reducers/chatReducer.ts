import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ChatMessageType} from '../types'

const initialState = {
    chatMessages: [] as ChatMessageType[],
}

export const chatSlices = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatMessages(state: InitialChatStateType, action: PayloadAction<{ chatMessages: ChatMessageType[] }>) {
            state.chatMessages = action.payload.chatMessages
        },
        addChatText(state, action: PayloadAction<ChatMessageType[]>) {
            // state.chatMessages.push(action.payload)
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {addChatText, setChatMessages} = chatSlices.actions

export type InitialChatStateType = typeof initialState