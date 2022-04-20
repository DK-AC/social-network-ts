import {NavLink} from 'react-router-dom';
import React from 'react';

import styles from './dialogItem.module.css';
import dialogPhoto from './../../../assets/img/dialogPhoto1.png';

type PropsType = { id: number, name: string }

export const DialogItem: React.FC<PropsType> = ({id, name}) => {

    const activeStyle = {
        color: 'gold',
        fontWeight: 'bold',
        textDecoration: 'none',
    };
    const defaultStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <div>
            <span className={styles.dialogItem}>
            <img src={dialogPhoto} alt="dialogPhoto"/>
                </span>
            <NavLink to={`/dialogs/${id}`}
                     style={({isActive}) => isActive ? activeStyle : defaultStyle}
            >
                {name}
            </NavLink>
        </div>
    );
};