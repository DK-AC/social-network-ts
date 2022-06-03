import {useEffect} from 'react'

import {useDispatch} from 'react-redux'

import {startMessagesListening, stopMessagesListening} from '../../store/reducers/chatReducer'

import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import styles from './chatPage.module.css'


export const ChatPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }

    }, [])

    return (
        <>
            <div className={styles.container}>
                <Messages/>
            </div>
            <AddMessageForm/>
        </>
    )
}

