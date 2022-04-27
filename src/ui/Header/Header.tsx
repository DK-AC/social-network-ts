import React from 'react';

import {useAppSelector} from '../../redux/store';

import styles from './header.module.css';
import logoDK from './../../assets/img/logoDK.svg';

export const Header = () => {

    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized);

    return (
        <header className={styles.header}>
            <img className={styles.logo}
                 src={logoDK}
                 alt="logo"/>
            {isInitialized && <img className={styles.initializedUser}
                                   src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                   alt="initializedUser"
            />
            }
        </header>
    );
};

