import React, {useRef} from 'react';
import styles from './dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {DialogsDataType, MessagesDataType} from "../../redux/state";

type PropsType = {
    dialogs: DialogsDataType[]
    messages: MessagesDataType[]
}

export const Dialogs = ({dialogs, messages}: PropsType) => {

    const inputEl = useRef<HTMLInputElement>(null)

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>
    })

    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>
    })

    const addMessageHandle = () => {
        if (inputEl && inputEl.current) {
            alert(inputEl.current.value)
        }
    }

    return (
        <>
            <div className={styles.dialogs}>
                <div className={styles.dialogsItem}>
                    {dialog}
                </div>
                <div className={styles.messages}>
                    {message}
                    <input type="text" ref={inputEl}/>
                    <button onClick={addMessageHandle}>add message</button>
                </div>
            </div>
        </>
    );
};

