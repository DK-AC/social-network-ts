import React, {useEffect} from 'react';
import {useAppSelector} from "../../redux/store";
import {User} from './User/User';
import styles from './users.module.css'
import {useDispatch} from "react-redux";
import {changeCurrentPageAC, setUsersTC} from "../../redux/reducers/usersReducer";
import {ParamsUserPageType} from "../../api/userAPI";

export const Users: React.FC = () => {

    const dispatch = useDispatch()

    const {users, pageSize, currentPage, totalCount} = useAppSelector(state => state.users)

    const params: ParamsUserPageType = {
        pageSize,
        currentPage
    }

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    useEffect(() => {
        dispatch(setUsersTC(params))
    }, [pageSize, currentPage])

    return (
        <div className={styles.userItems}>
            <div>
                {pages.map((p, index) => {
                    return (
                        <span key={index}
                              className={currentPage === p ? styles.currentPage : '' + styles.pageItems}
                              onClick={() => dispatch(changeCurrentPageAC(p))}
                        >
                        {p}</span>)
                })}
            </div>
            {user}
        </div>
    );
};



