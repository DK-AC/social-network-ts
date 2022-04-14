import React, {useEffect} from 'react';
import {useAppSelector} from "../../redux/store";
import {User} from './User/User';
import styles from './users.module.css'
import {useDispatch} from "react-redux";
import {setUsersTC} from "../../redux/reducers/usersReducer";

export const Users: React.FC = () => {

    const dispatch = useDispatch()

    const {users, pageSize, currentPage, totalCount} = useAppSelector(state => state.users)

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    useEffect(() => {
        dispatch(setUsersTC())
    }, [])

    return (
        <div className={styles.userItems}>
            {pages.map(p => {
                return <span className={currentPage === p ? styles.currentPage : ''}>{p} </span>
            })}
            {user}
        </div>
    );
};



