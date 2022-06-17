import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'
import {ChatMessageType} from 'types'
import {chatAPI} from 'api'
import {StatusChat, WebSocketStatus} from 'enum'

import {handleAsyncNetworkError, ThunkErrorType} from '../../utils/error-utils'

const initialState = {
    messages: [] as ChatMessageType[],
    chatStatus: StatusChat.Pending as StatusChat,
}

console.log(initialState)
console.log(initialState)

export const chatSlices = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatMessages(state: InitialChatStateType, action: PayloadAction<{ messages: ChatMessageType[] }>) {
            state.messages.push(...action.payload.messages)

        },
        changeChatStatusAC(state: InitialChatStateType, action: PayloadAction<{ chatStatus: StatusChat }>) {
            state.chatStatus = action.payload.chatStatus
        },
    },
})

export const chatReducer = chatSlices.reducer
export const {setChatMessages, changeChatStatusAC} = chatSlices.actions

let newMessageHandle: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandleCreator = (dispatch: Dispatch) => {
    if (newMessageHandle === null) {
        newMessageHandle = (messages) => {
            dispatch(setChatMessages({messages}))
        }
    }
    return newMessageHandle
}

let statusChangedHandle: ((status: StatusChat) => void) | null = null

const statusChangedHandleCreator = (dispatch: Dispatch) => {
    if (statusChangedHandle === null) {
        statusChangedHandle = (status) => {
            dispatch(changeChatStatusAC({chatStatus: status}))
        }
    }
    return statusChangedHandle
}


export const startMessagesListening = createAsyncThunk<{ messages: ChatMessageType[] }, void, ThunkErrorType>('chat/startMessagesListening',
    (messages, {dispatch, rejectWithValue}) => {
        try {
            chatAPI.startWebSocketChanel()
            chatAPI.subscribeNewMessages(WebSocketStatus.MessagesReceived, newMessageHandleCreator(dispatch))
            chatAPI.subscribeNewMessages(WebSocketStatus.StatusChanged, statusChangedHandleCreator(dispatch))
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const stopMessagesListening = createAsyncThunk<{ messages: ChatMessageType[] }, void, ThunkErrorType>('chat/stopMessagesListening',
    (messages, {dispatch, rejectWithValue}) => {
        try {
            chatAPI.unSubscribeNewMessages(WebSocketStatus.MessagesReceived, newMessageHandleCreator(dispatch))
            chatAPI.unSubscribeNewMessages(WebSocketStatus.StatusChanged, statusChangedHandleCreator(dispatch))

            chatAPI.stopWebSocketChanel()
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const sendChatMessage = createAsyncThunk<{ message: string }, { message: string }, ThunkErrorType>('chat/sendChatMessage',
    ({message}, {dispatch, rejectWithValue}) => {
        try {
            chatAPI.sendMessage(message)
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export type InitialChatStateType = typeof initialState
