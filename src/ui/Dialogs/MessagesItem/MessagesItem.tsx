import {NavLink} from "react-router-dom";
import styles from "./messagesItem.module.css";
import React from "react";

type PropsType = { id: number, message: string }

export const MessagesItem = ({id, message}: PropsType) => {
    return (
        <div className={styles.message}>
            <div className={`${styles.dialog}`}>{message}</div>
        </div>
    )
}