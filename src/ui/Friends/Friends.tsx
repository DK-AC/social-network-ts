import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAppSelector} from '../../store/store'
import {getIsAuth} from '../../store/selectors/authSelectors'

import {Paths} from '../../enum'

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
            navigate(Paths.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div className={styles.friends}>
            {friendsData}
        </div>
    )
}


