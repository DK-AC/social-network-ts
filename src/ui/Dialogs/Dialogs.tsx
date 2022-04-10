import React from 'react';
import styles from './dialogs.module.css'
import {NavLink} from "react-router-dom";

export const Dialogs = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItem}>
                <div>
                    <NavLink to={'/dialogs/1'} className={`${styles.dialog}`}>Jenya</NavLink>
                </div>
                <div>
                    <NavLink to={'/dialogs/2'} className={styles.dialog}>Sasha</NavLink>
                </div>
                <div>
                    <NavLink to={'/dialogs/3'} className={`${styles.dialog} ${styles.active}`}>Dima</NavLink>
                </div>
                <div>
                    <NavLink to={'/dialogs/4'} className={styles.dialog}>Rita</NavLink>
                </div>
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