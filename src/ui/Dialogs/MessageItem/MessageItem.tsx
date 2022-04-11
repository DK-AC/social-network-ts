import styles from "./messageItem.module.css";
import React from "react";

type PropsType = { id: number, message: string }

export const MessageItem = ({id, message}: PropsType) => {
    return (
        <div className={styles.message}>
            <div className={`${styles.dialog}`}>{message}</div>
        </div>
    )
}