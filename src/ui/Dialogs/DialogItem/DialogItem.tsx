import {NavLink} from "react-router-dom";
import styles from "./dialogItem.module.css";
import React from "react";

type PropsType = { id: number, name: string }

export const DialogItem: React.FC<PropsType> = ({id, name}) => {
    return (
        <div>
            <span className={styles.dialogItem}>
            <img
                src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                alt="userDialogs"/>
                </span>
            <NavLink to={`/dialogs/${id}`} className={`${styles.dialog}`}>{name}</NavLink>
        </div>
    )
}