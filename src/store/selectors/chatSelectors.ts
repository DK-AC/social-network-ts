import {RootStateType} from '../store'
import {ChatMessageType} from '../types'

export const getChatMessages = (state: RootStateType): ChatMessageType[] => state.chat.chatMessages
