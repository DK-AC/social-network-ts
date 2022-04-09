import React from 'react';
import styles from './header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo}
                src="https://lh3.googleusercontent.com/a-/AOh14Ggy8_OSY8VRciCDIW_ZvzviDGM26X33SG0K0TrlqQ=s600-k-no-rp-mo"
                alt="logo"/>
        </header>
    );
};

