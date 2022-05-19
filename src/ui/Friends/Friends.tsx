import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {PATH} from '../Routing/Routing'

import {FriendItem} from './FriendItem/FriendItem'
import styles from './friends.module.css'


export const Friends: React.FC = () => {

    const navigate = useNavigate()

    const friends = useAppSelector(state => state.sideBar.friends)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const friendsData = friends.map(f => {
        return <FriendItem key={f.id} id={f.id} name={f.name}/>
    })

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div className={styles.friends}>
            {friendsData}
        </div>
    )
}


