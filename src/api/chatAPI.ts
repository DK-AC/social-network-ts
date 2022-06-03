import {ChatMessageType} from '../types'
import {WebSocketEventType} from '../enum'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

let subscribers = [] as SubscriberNewMessagesType[]

let webSocket: WebSocket

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
}


export const chatAPI = {
    subscribeNewMessages(callback: SubscriberNewMessagesType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscriberNewMessagesType) {
        subscribers = subscribers.filter(subscriber => subscriber !== callback)
    },
}

type SubscriberNewMessagesType = (messages: ChatMessageType[]) => void
