import {RootStateType} from '../store'
import {ChatMessageType} from '../types/chat'
import {Nullable} from '../../types'

export const getChatMessages = (state: RootStateType): Nullable<ChatMessageType[]> => state.chat.chatMessages