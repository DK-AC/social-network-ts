import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css'

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div>
                <NavLink to={'/profile'} className={`${styles.item} ${styles.active}`}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'} className={`${styles.item}`}>Dialogs</NavLink>
            </div>
            <div>
                <NavLink to={'/news'} className={`${styles.item}`}>News</NavLink>
            </div>
            <div>
                <NavLink to={'/music'} className={`${styles.item}`}>Music</NavLink>
            </div>
            <div>
                <NavLink to={'/settings'} className={`${styles.item}`}>Settings</NavLink>
            </div>
        </nav>
    );
};