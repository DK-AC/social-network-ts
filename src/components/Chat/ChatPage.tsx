import React from 'react'

import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import styles from './chatPage.module.css'


export const ChatPage = () => {

    return (
        <>
            <div className={styles.container}>
                <Messages/>
            </div>
            <AddMessageForm/>
        </>
    )
}

