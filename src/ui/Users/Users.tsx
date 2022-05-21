import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {createSearchParams, useNavigate, useSearchParams} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {Preloader} from '../Preloader/Preloader'
import {PATH} from '../Routing/Routing'
import {Paginator} from '../common/Paginator'
import {setUsers} from '../../redux/reducers/usersReducer'

import {User} from './User/User'
import styles from './users.module.css'
import {UsersSearchForm} from './UsersSearchForm'

type QueryParamsType = { term?: string; page?: string; friend?: string c }


export const Users: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // @ts-ignore

    const test: QueryParamsType = Object.fromEntries([...searchParams])
    console.log(test)

    const {users, currentPage, pageSize} = useAppSelector(state => state.users)
    const {term, friend} = useAppSelector(state => state.users.filter)
    const {status} = useAppSelector(state => state.app)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })


    useEffect(() => {


        dispatch(setUsers({
            pageSize: test.pageSize,
            currentPage: test.page,
            term: test.term,
            friend: test.friend,
        }))

    }, [test.page, test.term])

    useEffect(() => {
            navigate({
                pathname: '/users',
                search: createSearchParams({
                    page: `${currentPage}`,
                    count: `${pageSize}`,
                    term: `${term}`,
                    friend: `${friend}`,
                }).toString(),
            })
        }
        , [])


    if (!isAuth) {
        navigate(PATH.LOGIN_PAGE)
    }

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



