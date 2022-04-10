import React from 'react';
import styles from './dialogs.module.css'
import {DialogsItem} from "./DialogsItem/DialogsItem";

export const Dialogs = () => {

    const dialogsItems = [
        {id: 1, name: 'Jenya'},
        {id: 2, name: 'Sasha'},
        {id: 3, name: 'Dima'},
        {id: 4, name: 'Rita'},
    ]

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItem}>
                {dialogsItems.map(d => {
                    return <DialogsItem key={d.id} id={d.id} name={d.name}/>
                })}
            </div>
            <div className={styles.messages}>
                <div className={styles.message}>Hello</div>
                <div className={styles.message}>How are you?</div>
                <div className={styles.message}>let's go</div>
                <div className={styles.message}>Stop</div>
            </div>
        </div>
    );
};

