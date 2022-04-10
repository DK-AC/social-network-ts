import React from 'react';
import styles from './dialogs.module.css'
import {DialogsItem} from "./DialogsItem/DialogsItem";
import {MessagesItem} from "./MessagesItem/MessagesItem";

export const Dialogs = () => {

    const dialogsItems = [
        {id: 1, name: 'Jenya'},
        {id: 2, name: 'Sasha'},
        {id: 3, name: 'Dima'},
        {id: 4, name: 'Rita'},
    ]

    const messagesData = [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'let\'s go'},
        {id: 4, message: 'Stop'},
    ]

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItem}>
                {dialogsItems.map(d => {
                    return <DialogsItem key={d.id} id={d.id} name={d.name}/>
                })}
            </div>
            <div className={styles.messages}>
                {dialogsItems.map(m => {
                    return <MessagesItem key={m.id} id={m.id} message={m.message}/>
                })}
            </div>
        </div>
    );
};

