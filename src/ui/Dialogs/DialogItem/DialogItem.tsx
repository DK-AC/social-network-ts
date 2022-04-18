import {NavLink} from "react-router-dom";
import styles from "./dialogItem.module.css";
import React from "react";
import dialogPhoto from './../../../assets/img/dialogPhoto1.png'

type PropsType = { id: number, name: string }

export const DialogItem: React.FC<PropsType> = ({id, name}) => {
    console.log('learn react-router-dom v6')
    console.log('learn react redux thunk')
    console.log('learn react redux thunk day 2')

    let activeStyle = {
        color: 'gold',
        fontWeight: 'bold',
        textDecoration: 'none'
    }
    let defaultStyle = {
        color: 'white',
        textDecoration: 'none'
    }

    return (
        <div>
            <span className={styles.dialogItem}>
            <img
                src={dialogPhoto}
                alt="dialogPhoto"/>
                </span>
            <NavLink to={`/dialogs/${id}`}
                     style={({isActive}) => isActive ? activeStyle : defaultStyle}>
                {name}
            </NavLink>
        </div>
    )
}