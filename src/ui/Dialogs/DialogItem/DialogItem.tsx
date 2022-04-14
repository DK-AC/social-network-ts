import {NavLink} from "react-router-dom";
import styles from "./dialogItem.module.css";
import React from "react";
import dialogPhoto from './../../../assets/img/dialogPhoto1.png'

type PropsType = { id: number, name: string }

export const DialogItem: React.FC<PropsType> = ({id, name}) => {
    return (
        <div>
            <span className={styles.dialogItem}>
            <img
                src={dialogPhoto}
                alt="dialogPhoto"/>
                </span>
            <NavLink to={`/dialogs/${id}`} className={`${styles.dialog}`}>{name}</NavLink>
        </div>
    )
}