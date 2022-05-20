import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {setUsers} from '../../redux/reducers/usersReducer'
import {Preloader} from '../Preloader/Preloader'
import {PATH} from '../Routing/Routing'
import {Paginator} from '../common/Paginator'

import {User} from './User/User'
import styles from './users.module.css'
import {UsersSearchForm} from './UsersSearchForm'


export const Users: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {users, currentPage, pageSize} = useAppSelector(state => state.users)
    const {term, friend} = useAppSelector(state => state.users.filter)
    const {status} = useAppSelector(state => state.app)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    useEffect(() => {

        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
        dispatch(setUsers({pageSize, currentPage, term, friend}))
    }, [isAuth, navigate, currentPage])

    return (
        <div className={styles.userItems}>
            {status === 'loading' ? <Preloader/>
                : <div>
                    <Paginator/>
                    <UsersSearchForm/>
                    {user}
                </div>}
        </div>
    )
}



