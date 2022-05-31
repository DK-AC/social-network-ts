import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ChatMessageType} from '../types'
import {Nullable} from '../../types'

const initialState = {
    chatMessages: [] as ChatMessageType[],
    userName: null as Nullable<string>,
    message: null as Nullable<string>,
    photo: null as Nullable<string>,
    userId: null as Nullable<number>,
}

export const chatSlices = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatMessages(state: InitialChatStateType, action: PayloadAction<{ chatMessages: ChatMessageType[] }>) {
            state.chatMessages = action.payload.chatMessages
        },
        addChatText(state, action: PayloadAction<ChatMessageType>) {

            const chatMessage: ChatMessageType = {
                userName: action.payload.userName,
                message: action.payload.message,
                photo: action.payload.photo,
                userId: action.payload.userId,
            }
            state.chatMessages.push(chatMessage)
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {addChatText, setChatMessages} = chatSlices.actions

export type InitialChatStateType = typeof initialState