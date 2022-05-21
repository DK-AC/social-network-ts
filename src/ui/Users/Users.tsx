import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {Preloader} from '../Preloader/Preloader'
import {PATH} from '../Routing/Routing'
import {Paginator} from '../common/Paginator'
import {changeCurrentPage, setUsers} from '../../redux/reducers/usersReducer'

import {User} from './User/User'
import styles from './users.module.css'
import {UsersSearchForm} from './UsersSearchForm'

type TestType = {
    page: string
    count: string
    term: string
    friend: string
}

export const Users: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    //const test = {page: 1, count: 10, term: '', friend: null}
    //Object.fromEntries({...searchParams})
    //console.log(searchParams.get('friend'))

    const {users, currentPage, pageSize} = useAppSelector(state => state.users)
    const {term, friend} = useAppSelector(state => state.users.filter)
    const {status} = useAppSelector(state => state.app)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    const pageQ = searchParams.get('page') || 'c'
    const countQ = searchParams.get('count') || '10'
    const termQ = searchParams.get('term') || ''
    const friendQ = searchParams.get('friend') || 'null'

    const params = {
        page: pageQ,
        count: countQ,
        term: termQ,
        friend: friendQ,
    }

    useEffect(() => {
        setSearchParams(params)
        console.log(params)

        dispatch(setUsers({
            pageSize: +params.count,
            currentPage: +params.page,
            term: params.term,
            friend: params.friend === 'null' ? null : params.friend === 'true',
        }))
        dispatch(changeCurrentPage({currentPage: +params.page}))

    }, [dispatch, pageQ,params.page])

    // useEffect(() => {
    //         navigate({
    //             pathname: '/users',
    //             search: createSearchParams(params).toString(),
    //         })
    //     }
    //     , [])


    if (!isAuth) {
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <div className={styles.userItems}>
            {status === 'loading' ? <Preloader/>
                : <div>
                    <Paginator setSearchParams={setSearchParams}/>
                    <UsersSearchForm/>
                    {user}
                </div>}
        </div>
    )
}


// import React, {useEffect} from 'react'
// import {useDispatch} from 'react-redux'
// import {useNavigate, useSearchParams} from 'react-router-dom'
//
// import {useAppSelector} from '../../redux/store'
// import {setUsers} from '../../redux/reducers/usersReducer'
// import {Preloader} from '../Preloader/Preloader'
// import {PATH} from '../Routing/Routing'
// import {Paginator} from '../common/Paginator'
//
// import {User} from './User/User'
// import styles from './users.module.css'
// import {UsersSearchForm} from './UsersSearchForm'
//
// export const Users: React.FC = () => {
//
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//
//     const [searchParams] = useSearchParams()
//
//
//
//
//
//     const {users, currentPage, pageSize} = useAppSelector(state => state.users)
//     const {term, friend} = useAppSelector(state => state.users.filter)
//     const {status} = useAppSelector(state => state.app)
//     const isAuth = useAppSelector(state => state.auth.isAuth)
//
//     const user = users.map(u => {
//         return <User key={u.id} user={u}/>
//     })
//
//     useEffect(() => {
//         navigate({
//             pathname: '/users',
//             search: `?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`,
//         })
//     }, [pageSize, currentPage, term, friend, navigate])
//
//     useEffect(() => {
//         // @ts-ignore
//         const currentParams = Object.fromEntries([...searchParams])
//         dispatch(setUsers({
//             pageSize: currentParams.count,
//             currentPage: currentParams.page,
//             term: currentParams.term,
//             friend: currentParams.friend,
//         }))
//         console.log(currentParams) // get new values onchange
//     }, [searchParams])
//
//
//
//     useEffect(() => {
//
//         // dispatch(setUsers({pageSize, currentPage, term, friend}))
//     }, [isAuth, navigate, currentPage])
//
//     if (!isAuth) {
//         navigate(PATH.LOGIN_PAGE)
//     }
//
//     return (
//         <div className={styles.userItems}>
//             {status === 'loading' ? <Preloader/>
//                 : <div>
//                     <Paginator/>
//                     <UsersSearchForm/>
//                     {user}
//                 </div>}
//         </div>
//     )
// }