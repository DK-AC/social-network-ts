import React from 'react';
import styles from './dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {DialogsDataType, MessagesDataType} from "../../redux/state";

type PropsType = {
    dialogs: DialogsDataType[]
    messages: MessagesDataType[]
}

export const Dialogs = ({dialogs, messages}: PropsType) => {

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>
    })

    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>
    })

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItem}>
                {dialog}
            </div>
            <div className={styles.messages}>
                {message}
            </div>
        </div>
    );
};

