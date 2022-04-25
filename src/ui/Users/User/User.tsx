import React from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {followUserAC, followUserTC, unfollowUserAC, unfollowUserTC, UserType} from '../../../redux/reducers/usersReducer';

import styles from './user.module.css';
import avaImg from './../../../assets/img/client-2-512.webp';


type PropsType = {
    user: UserType
}

export const User: React.FC<PropsType> = ({user}) => {

    const dispatch = useDispatch();

    const {id, name, photos, followed, status} = user;

    const followUserHandle = () => dispatch(followUserTC(id));
    const unFollowUserHandle = () => dispatch(unfollowUserTC(id));

    return (
        <div className={styles.item}>
            <div>
                <div>{name}</div>
            </div>
            <div>
                <div>
                    <NavLink to={'/profile/' + id}>
                        <img
                            src={photos.small ? photos.small : avaImg}
                            alt="ava"
                            className={styles.ava}
                        />
                    </NavLink>

                </div>
                <div>{status}</div>

                <div>
                    {followed
                        ? <button onClick={unFollowUserHandle}>Unfollow</button>
                        : <button onClick={followUserHandle}>Follow</button>
                    }
                </div>
            </div>

        </div>
    );
};