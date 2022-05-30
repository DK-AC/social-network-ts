import {FC} from 'react'

import {NavBarLink} from '../../reusableComponent/NavBarLink'
import {Paths} from '../../enum'

import styles from './navbar.module.css'

export const Navbar: FC = () => {

    return (
        <nav className={styles.nav}>
            <NavBarLink path={Paths.PROFILE_PAGE} title={'Profile'}/>
            <NavBarLink path={Paths.USERS_PAGE} title={'Users'}/>
            <NavBarLink path={Paths.DIALOGS_PAGE} title={'Dialogs'}/>
            <NavBarLink path={Paths.NEWS_PAGE} title={'News'}/>
            <NavBarLink path={Paths.MUSIC_PAGE} title={'Music'}/>
            <NavBarLink path={Paths.SETTINGS_PAGE} title={'Settings'}/>
            <NavBarLink path={Paths.FRIENDS_PAGE} title={'Friends'}/>
        </nav>
    )
}