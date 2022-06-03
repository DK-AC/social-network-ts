import {ChatMessageType, Nullable} from '../types'
import {WebSocketEventType} from '../enum'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

let subscribers = [] as SubscriberNewMessagesType[]

let webSocket: Nullable<WebSocket>

const closeWebSocketEvent = () => {
    console.log('Close ws')
    setTimeout(createChannel, 3000)
}

const messageWebSocketEvent = (event: MessageEvent) => {
    const newMessages = JSON.parse(event.data)
    subscribers.forEach(subscriber => subscriber(newMessages))
}

function createChannel() {

    webSocket?.removeEventListener(WebSocketEventType.Close, closeWebSocketEvent)
    webSocket?.close()

    webSocket = new WebSocket(WebSocketCommonChatURL)
    webSocket.addEventListener(WebSocketEventType.Close, closeWebSocketEvent)
    webSocket.addEventListener(WebSocketEventType.Message, messageWebSocketEvent)
}


export const chatAPI = {
    startWebSocketChanel() {
        createChannel()
    },
    stopWebSocketChanel() {
        subscribers = []
        webSocket?.removeEventListener(WebSocketEventType.Close, closeWebSocketEvent)
        webSocket?.removeEventListener(WebSocketEventType.Message, messageWebSocketEvent)
        webSocket?.close()
    },
    subscribeNewMessages(callback: SubscriberNewMessagesType) {
        subscribers.push(callback)
    },
    unSubscribeNewMessages(callback: SubscriberNewMessagesType) {
        subscribers = subscribers.filter(subscriber => subscriber !== callback)
    },
    sendMessage(message: string) {
        webSocket?.send(message)
    },
}

type SubscriberNewMessagesType = (messages: ChatMessageType[]) => void
