import {Nullable} from '../Nullable'
import {WebSocketStatus} from '../../enum'

export type ChatMessageType = {
    userName: Nullable<string>
    photo: Nullable<string>
    message: Nullable<string>
    userId: Nullable<number>
}
export type WebSocketStatusType = WebSocketStatus.Pending | WebSocketStatus.Ready