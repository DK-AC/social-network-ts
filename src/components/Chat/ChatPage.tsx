import React, {useEffect, useState} from 'react'

import {Nullable} from '../../types'
import {WebSocketEventType} from '../../enum'

import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import styles from './chatPage.module.css'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

export const ChatPage = () => {

    const [webSocketChannel, setWebSocketChannel] = useState<Nullable<WebSocket>>(null)

    useEffect(() => {

        let webSocket: WebSocket

        const closeWebSocketEvent = () => {
            console.log('Close ws')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

            webSocket?.removeEventListener(WebSocketEventType.Close, closeWebSocketEvent)
            webSocket?.close()

            webSocket = new WebSocket(WebSocketCommonChatURL)
            webSocket.addEventListener(WebSocketEventType.Close, closeWebSocketEvent)

            setWebSocketChannel(webSocket)
        }

        createChannel()

        return () => {
            webSocket.removeEventListener(WebSocketEventType.Close, closeWebSocketEvent)
            webSocket.close()
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Messages webSocketChannel={webSocketChannel}/>
            </div>
            <AddMessageForm webSocketChannel={webSocketChannel}/>
        </>
    )
}

