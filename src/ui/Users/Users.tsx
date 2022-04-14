import React, {useEffect} from 'react';
import {useAppSelector} from "../../redux/store";
import {User} from './User/User';
import styles from './users.module.css'
import {useDispatch} from "react-redux";
import {setUsersTC} from "../../redux/reducers/usersReducer";

export const Users: React.FC = () => {

    const dispatch = useDispatch()

    const users = useAppSelector(state => state.users.users)

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    useEffect(() => {
        dispatch(setUsersTC())
    }, [])

    return (
        <div className={styles.userItems}>
            {user}
        </div>
    );
};



