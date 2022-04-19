import React from 'react';
import styles from './header.module.css'
import {useAppSelector} from "../../redux/store";

export const Header = () => {

    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)

    return (
        <header className={styles.header}>
            <img className={styles.logo}
                 src="https://lh3.googleusercontent.com/a-/AOh14Ggy8_OSY8VRciCDIW_ZvzviDGM26X33SG0K0TrlqQ=s600-k-no-rp-mo"
                 alt="logo"/>
            {isInitialized ?
                <img className={styles.initializedUser}
                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                     alt="initializedUser"
                />
                : <button className={styles.initializedUser}>sign in</button>}

        </header>
    );
};

