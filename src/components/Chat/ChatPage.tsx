import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {setChatMessages} from '../../store/reducers/chatReducer'

import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import styles from './chatPage.module.css'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

export const ChatPage = () => {

    const dispatch = useDispatch()

    const webSocketChat = new WebSocket(WebSocketCommonChatURL)

    useEffect(() => {
        webSocketChat.addEventListener('message', (event) => {
            dispatch(setChatMessages({chatMessages: JSON.parse(event.data)}))
        })
    }, [dispatch])

    return (
        <>
            <div className={styles.container}>
                <Messages/>
            </div>
            <AddMessageForm webSocketChat={webSocketChat}/>
        </>
    )
}

