import React from 'react';
import styles from './dialogs.module.css'

export const Dialogs = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItem}>
                <div className={`${styles.dialog}`}>Jenya</div>
                <div className={styles.dialog}>Sasha</div>
                <div className={`${styles.dialog} ${styles.active}`}>Dima</div>
                <div className={styles.dialog}>Rita</div>
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