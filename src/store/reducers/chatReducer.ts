import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ChatMessageType} from '../types/chat'
import {Nullable} from '../../types'


const initialState = {
    chatMessages: null as Nullable<ChatMessageType[]>,
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
            console.log(action.payload)
            //@ts-ignore
            state.chatMessages = action.payload
        },
        addChatText(state, action: PayloadAction<ChatMessageType>) {
            const chatMessage: ChatMessageType = {
                userName: action.payload.userName,
                message: action.payload.message,
                photo: action.payload.photo,
                userId: action.payload.userId,
            }
                // @ts-ignore
            state.chatMessages.push(chatMessage)
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {addChatText, setChatMessages} = chatSlices.actions

export type InitialChatStateType = typeof initialState