import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {ChatMessageType} from '../../types'
import {handleAsyncNetworkError, ThunkErrorType} from '../../utils/error-utils'
import {chatAPI} from '../../api/chatAPI'

const initialState = {
    messages: [] as ChatMessageType[],
}

export const chatSlices = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatMessages(state: InitialChatStateType, action: PayloadAction<{ messages: ChatMessageType[] }>) {
            state.messages.push(...action.payload.messages)
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {setChatMessages} = chatSlices.actions

let newMessageHandle: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandleCreator = (dispatch: Dispatch) => {
    if (newMessageHandle === null) {
        newMessageHandle = (messages) => {
            dispatch(setChatMessages({messages}))
        }
    }
    return newMessageHandle
}

export const startMessagesListening = createAsyncThunk<{ messages: ChatMessageType[] }, void, ThunkErrorType>('chat/startMessagesListening',
    async (messages, {dispatch, rejectWithValue}) => {
        try {
            chatAPI.startWebSocketChanel()
            await chatAPI.subscribeNewMessages(newMessageHandleCreator(dispatch))
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const stopMessagesListening = createAsyncThunk<{ messages: ChatMessageType[] }, void, ThunkErrorType>('chat/stopMessagesListening',
    async (messages, {dispatch, rejectWithValue}) => {
        try {
            await chatAPI.unSubscribeNewMessages(newMessageHandleCreator(dispatch))
            chatAPI.startWebSocketChanel()
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const sendChatMessage = createAsyncThunk<{ message: string }, { message: string }, ThunkErrorType>('chat/sendChatMessage',
    async ({message}, {dispatch, rejectWithValue}) => {
        try {
            await chatAPI.sendMessage(message)
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export type InitialChatStateType = typeof initialState