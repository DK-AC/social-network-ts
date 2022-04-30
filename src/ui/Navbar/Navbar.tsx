import React from 'react';

import {useAppSelector} from '../../redux/store';
import {NavBarLink} from '../../reusableComponent/NavBarLink';
import {PATH} from '../Routing/Routing';

import styles from './navbar.module.css';

export const Navbar: React.FC = () => {

    const friends = useAppSelector(state => state.sideBar.friends);

    return (
        <nav className={styles.nav}>
            <NavBarLink path={PATH.START_PAGE} title={'Profile'}/>
            <NavBarLink path={PATH.USERS_PAGE} title={'Users'}/>
            <NavBarLink path={PATH.DIALOGS_PAGE} title={'Dialogs'}/>
            <NavBarLink path={PATH.NEWS_PAGE} title={'News'}/>
            <NavBarLink path={PATH.MUSIC_PAGE} title={'Music'}/>
            <NavBarLink path={PATH.SETTINGS_PAGE} title={'Settings'}/>
            <NavBarLink path={PATH.FRIENDS_PAGE} title={'Friends'}/>
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