import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {Preloader} from '../Preloader/Preloader'
import {PATH} from '../Routing/Routing'
import {Paginator} from '../common/Paginator'
import {changeCurrentPage, setUsers} from '../../redux/reducers/usersReducer'
import {UriParamsType} from '../../api/userAPI'

import {User} from './User/User'
import styles from './users.module.css'
import {UsersSearchForm} from './UsersSearchForm'


export const Users: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {users, pageSize} = useAppSelector(state => state.users)
    const {status} = useAppSelector(state => state.app)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const [searchParams, setSearchParams] = useSearchParams()

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    const pageQ = searchParams.get('page') || '1'
    const countQ = searchParams.get('count') || pageSize.toString()
    const termQ = searchParams.get('term') || ''
    const friendQ = searchParams.get('friend') || 'null'

    const uriParams: UriParamsType = {
        page: pageQ,
        count: countQ,
        term: termQ,
        friend: friendQ,
    }

    useEffect(() => {
        setSearchParams(uriParams)

        dispatch(setUsers({
            pageSize: +uriParams.count,
            currentPage: +uriParams.page,
            term: uriParams.term,
            friend: uriParams.friend === 'null' ? null : uriParams.friend === 'true',
        }))
        dispatch(changeCurrentPage({currentPage: +uriParams.page}))

    }, [dispatch, pageQ, uriParams.page])


    if (!isAuth) {
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <div className={styles.userItems}>
            {status === 'loading' ? <Preloader/>
                : <div>
                    <Paginator setSearchParams={setSearchParams} uriParams={uriParams}/>
                    <UsersSearchForm setSearchParams={setSearchParams} />
                    {user}
                </div>}
        </div>
    )
}