import {FC, useEffect, useState} from 'react'

import {ChatMessageType, Nullable} from '../../../types'
import {WebSocketEventType} from '../../../enum'

import {EMPTY_STRING} from '../../../constans'

import {Message} from './Message'

type PropsType = {
    webSocketChannel: Nullable<WebSocket>
}

export const Messages: FC<PropsType> = ({webSocketChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {

        const messageWebSocketEvent = (event: MessageEvent) => {
            const newMessages = JSON.parse(event.data)
            setMessages((prevState) => [...prevState, ...newMessages])
        }

        webSocketChannel?.addEventListener(WebSocketEventType.Message, messageWebSocketEvent)

        return () => {
            webSocketChannel?.removeEventListener(WebSocketEventType.Message, messageWebSocketEvent)
        }
    }, [webSocketChannel])

    const message = messages.map((message: ChatMessageType, index) => {
        return <Message key={index + EMPTY_STRING + message.userId} chatMessage={message}/>
    })

    return (
        <>{message}</>
    )
}