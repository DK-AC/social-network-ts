import {NavLink} from "react-router-dom";
import styles from "./dialogItem.module.css";
import React from "react";

type PropsType = { id: number, name: string }

export const DialogItem = ({id, name}: PropsType) => {
    return (
        <div className={styles.dialogsItem}>
            <NavLink to={`/dialogs/${id}`} className={`${styles.dialog}`}>{name}</NavLink>
        </div>
    )
}