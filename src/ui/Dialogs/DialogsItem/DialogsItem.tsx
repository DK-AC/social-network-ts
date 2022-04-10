import {NavLink} from "react-router-dom";
import styles from "../dialogs.module.css";
import React from "react";

type PropsType = { id: number, name: string }

export const DialogsItem = ({id, name}: PropsType) => {
    return (
        <div>
            <NavLink to={`/dialogs/${id}`} className={`${styles.dialog}`}>{name}</NavLink>
        </div>
    )
}