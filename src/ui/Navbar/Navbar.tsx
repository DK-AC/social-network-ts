import React from 'react'

import {NavBarLink} from '../../reusableComponent/NavBarLink'
import {PATH} from '../Routing/Routing'

import styles from './navbar.module.css'

export const Navbar: React.FC = () => {

    return (
        <nav className={styles.nav}>
            <NavBarLink path={PATH.PROFILE_PAGE} title={'Profile'}/>
            <NavBarLink path={PATH.USERS_PAGE} title={'Users'}/>
            <NavBarLink path={PATH.DIALOGS_PAGE} title={'Dialogs'}/>
            <NavBarLink path={PATH.NEWS_PAGE} title={'News'}/>
            <NavBarLink path={PATH.MUSIC_PAGE} title={'Music'}/>
            <NavBarLink path={PATH.SETTINGS_PAGE} title={'Settings'}/>
            <NavBarLink path={PATH.FRIENDS_PAGE} title={'Friends'}/>
        </nav>
    )
}