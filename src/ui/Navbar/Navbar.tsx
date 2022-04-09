import React from 'react';
import styles from './navbar.module.css'

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div>Profile</div>
            <div>Messages</div>
            <div>News</div>
            <div>Music</div>
            <div>Settings</div>
        </nav>
    );
};