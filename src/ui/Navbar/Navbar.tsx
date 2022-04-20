import React from 'react';
import {NavLink} from 'react-router-dom';

import {useAppSelector} from '../../redux/store';

import styles from './navbar.module.css';


export const Navbar: React.FC = () => {

    const activeStyle = {
        color: 'gold',
        fontWeight: 'bold',
        textDecoration: 'none',
    };
    const defaultStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    const friends = useAppSelector(state => state.sideBar.friends);

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink to={'/profile'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to={'/users/*'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    Users
                </NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    Dialogs
                </NavLink>
            </div>
            <div>
                <NavLink to={'/news'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    News
                </NavLink>
            </div>
            <div>
                <NavLink to={'/music'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    Music
                </NavLink>
            </div>
            <div>
                <NavLink to={'/settings'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    Settings
                </NavLink>
            </div>
            <div className={`${styles.friends}`}>
                <NavLink to={'/friends'}
                         style={({isActive}) => isActive ? activeStyle : defaultStyle}
                >
                    Friends
                </NavLink>
            </div>
            <div className={styles.friendsPage}>
                {friends.map(f => {
                    return (<div key={f.id}>
                        <img
                            src="https://st4.depositphotos.com/1001248/29463/v/600/depositphotos_294631336-stock-illustration-user-sign-flat-related-vector.jpg"
                            alt="friends"/>
                    </div>);
                })}
            </div>
            <div>

            </div>
        </nav>
    );
};