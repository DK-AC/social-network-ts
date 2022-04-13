import React, {ChangeEvent, useState} from 'react';
import styles from './dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {sendMessageAC, updateNewMessageAC} from "../../redux/reducers/dialogReducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/store";


export const Dialogs: React.FC = () => {

    const dispatch = useDispatch()

    const dialogs = useAppSelector(state => state.dialogs.dialogs)
    const messages = useAppSelector(state => state.dialogs.messages)
    const newMessageText = useAppSelector(state => state.dialogs.newMessageText)

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>
    })

    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>
    })

    const sendMessageHandle = () => {
        dispatch(sendMessageAC(newMessageText))
    }
    const updateNewMessageTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewMessageAC(e.currentTarget.value))
    }

    return (
        <>
            <div className={styles.dialogs}>
                <div className={styles.dialogsItem}>
                    {dialog}
                </div>
                <div className={styles.messages}>
                    {message}
                    <input type="text" value={newMessageText} onChange={updateNewMessageTextHandle}/>
                    <button onClick={sendMessageHandle}>add message</button>
                </div>
            </div>
        </>
    );
};

