import React from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../redux/store';
import {logoutTC} from '../../redux/reducers/authReducer';

import styles from './header.module.css';
import logoDK from './../../assets/img/logoDK.svg';

export const Header = () => {

    const dispatch = useDispatch()

    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized);

    const logoutHandle = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={styles.header}>
            <img className={styles.logo}
                 src={logoDK}
                 alt="logo"/>
            {isInitialized && <span>
                <img className={styles.initializedUser}
                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                     alt="initializedUser"
                />
                <button className={styles.button} onClick={logoutHandle}> log out</button>
            </span>
            }
        </header>
    );
};

