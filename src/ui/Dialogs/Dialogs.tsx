import React from 'react';
import styles from './dialogs.module.css'
import {DialogsItem} from "./DialogsItem/DialogsItem";

export const Dialogs = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItem}>
                <DialogsItem name={'Jenya'} id={1}/>
                <DialogsItem name={'Sasha'} id={2}/>
                <DialogsItem name={'Dima'} id={3}/>
                <DialogsItem name={'Rita'} id={4}/>
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

