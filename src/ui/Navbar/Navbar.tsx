import React from 'react';
import styles from './navbar.module.css'

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={`${styles.item} ${styles.active}`}>Profile</div>
            <div className={`${styles.item}`}>Messages</div>
            <div className={`${styles.item}`}>News</div>
            <div className={`${styles.item}`}>Music</div>
            <div className={`${styles.item}`}>Settings</div>
        </nav>
    );
};