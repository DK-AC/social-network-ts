import React from 'react'

import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import styles from './chatPage.module.css'

export const ChatPage = () => {

    const webSocketChat: WebSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


    return (
        <>
            <div className={styles.container}>
                <Messages webSocketChat={webSocketChat}/>
            </div>
            <AddMessageForm webSocketChat={webSocketChat}/>
        </>
    )
}

