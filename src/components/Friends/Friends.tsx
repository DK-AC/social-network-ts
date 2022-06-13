import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {Path} from '../../enum'
import {getIsAuth, useAppSelector} from '../../store'

import {FriendItem} from './FriendItem'
import styles from './friends.module.css'


export const Friends: FC = () => {

    const navigate = useNavigate()

    const friends = useAppSelector(state => state.sideBar.friends)
    const isAuth = useAppSelector(getIsAuth)

    const friendsData = friends.map(f => {
        return <FriendItem key={f.id} id={f.id} name={f.name}/>
    })

    useEffect(() => {
        if (!isAuth) {
            navigate(Path.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div className={styles.friends}>
            {friendsData}
        </div>
    )
}


