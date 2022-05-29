import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {useAppSelector} from '../../store/store'
import {Preloader} from '../Preloader'
import {Paginator} from '../common'
import {changeCurrentPage, changePageSize, setUsers} from '../../store/reducers/usersReducer'
import {UriParamsType} from '../../api'
import {getIsAuth} from '../../store/selectors/authSelectors'
import {getAppStatus} from '../../store/selectors/appSelectors'
import {getPageSize, getUsersSelector} from '../../store/selectors/usersSelectors'

import {Paths} from '../../enum'

import {UsersSearchForm} from './UsersSearchForm'
import {User} from './User'
import styles from './users.module.css'


export const Users: FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useAppSelector(getUsersSelector)
    const pageSize = useAppSelector(getPageSize)
    const status = useAppSelector(getAppStatus)
    const isAuth = useAppSelector(getIsAuth)

    const [searchParams, setSearchParams] = useSearchParams()

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    const actualPage = searchParams.get('page') || '1'
    const actualCount = searchParams.get('count') || String(pageSize)
    const actualTerm = searchParams.get('term') || ''
    const actualFriend = searchParams.get('friend') || 'null'

    const uriParams: UriParamsType = {
        page: actualPage,
        count: actualCount,
        term: actualTerm,
        friend: actualFriend,
    }

    useEffect(() => {
        setSearchParams(uriParams)
        dispatch(setUsers({
            pageSize: Number(uriParams.count),
            currentPage: Number(uriParams.page),
            term: uriParams.term,
            friend: uriParams.friend === 'null' ? 'null' : uriParams.friend === 'true',
        }))
        dispatch(changeCurrentPage({currentPage: Number(uriParams.page)}))
        dispatch(changePageSize({pageSize: Number(uriParams.count)}))

    }, [dispatch, actualPage, uriParams.page, uriParams.count])

    if (!isAuth) {
        navigate(Paths.LOGIN_PAGE)
    }

    return (
        <div className={styles.userItems}>
            {status === 'loading' ? <Preloader/>
                : <div>
                    <Paginator setSearchParams={setSearchParams} uriParams={uriParams}/>
                    <UsersSearchForm setSearchParams={setSearchParams}/>
                    {user}
                </div>}
        </div>
    )
}