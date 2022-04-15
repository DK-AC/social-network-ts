import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css'
import {useAppSelector} from "../../redux/store";


export const Navbar: React.FC = () => {

    const friends = useAppSelector(state => state.sideBar.friends)

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink to={'/profile/:userId'} className={`${styles.item} ${styles.active}`}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/users/*'} className={`${styles.item}`}>Users</NavLink>
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
            <div className={`${styles.friends}`}>
                <NavLink to={'/friends'} className={`${styles.item}`}>Friends</NavLink>
            </div>
            <div className={styles.friendsPage}>
                {friends.map(f => {
                    return (<div key={f.id}>
                        <img
                            src="https://st4.depositphotos.com/1001248/29463/v/600/depositphotos_294631336-stock-illustration-user-sign-flat-related-vector.jpg"
                            alt="friends"/>
                    </div>)
                })}
            </div>
            <div>

            </div>
        </nav>
    );
};