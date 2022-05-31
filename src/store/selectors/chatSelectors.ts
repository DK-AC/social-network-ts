import {RootStateType} from '../store'
import {ChatMessageType} from '../types/chat'

export const getChatMessages = (state: RootStateType): ChatMessageType[] => state.chat.chatMessages