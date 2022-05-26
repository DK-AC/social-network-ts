import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {Preloader} from '../Preloader/Preloader'
import {PATH} from '../Routing/Routing'
import {Paginator} from '../common/Paginator'
import {changeCurrentPage, changePageSize, setUsers} from '../../redux/reducers/usersReducer'
import {UriParamsType} from '../../api/userAPI'

import {getIsAuth} from '../../selectors/authSelectors'

import {User} from './User/User'
import styles from './users.module.css'
import {UsersSearchForm} from './UsersSearchForm'


export const Users: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {users, pageSize} = useAppSelector(state => state.users)
    const {status} = useAppSelector(state => state.app)
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
        navigate(PATH.LOGIN_PAGE)
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