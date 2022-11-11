import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {Path} from 'enum'
import {UriParamsType} from 'types'

import {
    changeCurrentPage,
    changePageSize,
    getAppStatus,
    getIsAuth,
    getPageSize,
    getUsersSelector,
    setUsers,
    useAppSelector,
} from 'store'

import {Paginator} from '../common'
import {Preloader} from '../Preloader'

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
        return <User key={u.id} user={u} />
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
        navigate(Path.LOGIN_PAGE)
    }

    return (
        <div>
            {status === 'loading' ? <Preloader />
                : <div>
                    <Paginator setSearchParams={setSearchParams} uriParams={uriParams} />
                    <UsersSearchForm setSearchParams={setSearchParams} />
                    <div className={styles.usersList}>{user}</div>
                </div>}
        </div>
    )
}