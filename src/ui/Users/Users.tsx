import React from 'react';
import {useAppSelector} from "../../redux/store";
import {User} from './User/User';
import styles from './users.module.css'

export const Users: React.FC = () => {

    const users = useAppSelector(state => state.users.users)

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })

    return (
        <div className={styles.userItems}>
            {user}
        </div>
    );
};



