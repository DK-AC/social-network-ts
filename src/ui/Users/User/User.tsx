import React from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {followUserTC, unfollowUserTC, UserType} from '../../../redux/reducers/usersReducer';
import {useAppSelector} from '../../../redux/store';

import styles from './user.module.css';
import avaImg from './../../../assets/img/client-2-512.webp';


type PropsType = {
    user: UserType
}

export const User: React.FC<PropsType> = ({user}) => {

    const dispatch = useDispatch();

    const followingInProgress = useAppSelector(state => state.app.followingInProgress)

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
                        ? <button disabled={followingInProgress} onClick={unFollowUserHandle}>Unfollow</button>
                        : <button disabled={followingInProgress} onClick={followUserHandle}>Follow</button>
                    }
                </div>
            </div>

        </div>
    );
};