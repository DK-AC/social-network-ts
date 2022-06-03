import {ChatMessageType, Nullable} from '../types'
import {StatusChat, WebSocketEventType, WebSocketStatus} from '../enum'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

const subscribers = {
    [WebSocketStatus.MessagesReceived]: [] as MessagesReceivedSubscriberType[],
    [WebSocketStatus.StatusChanged]: [] as StatusChangedSubscriberType[],
}
let MessageReceivedArrayElement = subscribers[WebSocketStatus.MessagesReceived]
let StatusChangedArrayElement = subscribers[WebSocketStatus.StatusChanged]


let webSocket: Nullable<WebSocket>

const closeWebSocketEvent = () => {
    notifySubscribersAboutStatus(StatusChat.Pending)
    setTimeout(createChannel, 3000)
}

const messageWebSocketEvent = (event: MessageEvent) => {
    const newMessages = JSON.parse(event.data)
    MessageReceivedArrayElement.forEach(subscriber => subscriber(newMessages))
}

const openWebSocketEvent = () => {
    notifySubscribersAboutStatus(StatusChat.Ready)
}

const errorWebSocketEvent = () => {
    notifySubscribersAboutStatus(StatusChat.Error)
    console.error('Refresh Page')
}

const notifySubscribersAboutStatus = (status: StatusChat) => {
    StatusChangedArrayElement.forEach(subscriber => subscriber(status))
}

const cleanUpWebSocketChanel = () => {
    webSocket?.removeEventListener(WebSocketEventType.Close, closeWebSocketEvent)
    webSocket?.removeEventListener(WebSocketEventType.Message, messageWebSocketEvent)
    webSocket?.removeEventListener(WebSocketEventType.Open, openWebSocketEvent)
    webSocket?.removeEventListener(WebSocketEventType.Error, errorWebSocketEvent)
}


function createChannel() {

    cleanUpWebSocketChanel()

    webSocket?.close()

    webSocket = new WebSocket(WebSocketCommonChatURL)

    notifySubscribersAboutStatus(StatusChat.Pending)

    webSocket.addEventListener(WebSocketEventType.Close, closeWebSocketEvent)
    webSocket.addEventListener(WebSocketEventType.Message, messageWebSocketEvent)
    webSocket.addEventListener(WebSocketEventType.Open, openWebSocketEvent)
    webSocket.addEventListener(WebSocketEventType.Error, errorWebSocketEvent)
}


export const chatAPI = {
    startWebSocketChanel() {
        createChannel()
    },
    stopWebSocketChanel() {
        StatusChangedArrayElement = []
        MessageReceivedArrayElement = []
        cleanUpWebSocketChanel()
        webSocket?.close()
    },
    subscribeNewMessages(eventName: WebSocketStatus,
                         callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
    },
    unSubscribeNewMessages(eventName: WebSocketStatus,
                           callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback)
    },
    sendMessage(message: string) {
        webSocket?.send(message)
    },
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
export type StatusChangedSubscriberType = (status: StatusChat) => void
