import {FC} from 'react'

import {NavBarLink} from '../../reusableComponent/NavBarLink'
import {Path} from '../../enum'

import styles from './navbar.module.css'

export const Navbar: FC = () => {

    return (
        <nav className={styles.nav}>
            <NavBarLink path={Path.PROFILE_PAGE} title={'Profile'}/>
            <NavBarLink path={Path.USERS_PAGE} title={'Users'}/>
            <NavBarLink path={Path.DIALOGS_PAGE} title={'Dialogs'}/>
            <NavBarLink path={Path.NEWS_PAGE} title={'News'}/>
            <NavBarLink path={Path.MUSIC_PAGE} title={'Music'}/>
            <NavBarLink path={Path.SETTINGS_PAGE} title={'Settings'}/>
            <NavBarLink path={Path.FRIENDS_PAGE} title={'Friends'}/>
        </nav>
    )
}