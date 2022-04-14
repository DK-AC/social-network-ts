import React from "react";
import {followUserAC, unfollowUserAC, UserType} from "../../../redux/reducers/usersReducer";
import styles from './user.module.css'
import {useDispatch} from "react-redux";

type PropsType = {
    user: UserType
}

export const User: React.FC<PropsType> = ({user}) => {

    const dispatch = useDispatch()

    const {id, name, photos, followed, status} = user

    const followUserHandle = () => dispatch(followUserAC(id))
    const unFollowUserHandle = () => dispatch(unfollowUserAC(id))

    return (
        <div className={styles.item}>
            <div>
                <div>{name}</div>
            </div>
            <div>
                <div>
                    <img
                        src={photos.small ? photos.small : 'https://cdn3.iconfinder.com/data/icons/business-finance-line-5/32/client-2-512.png'}
                        alt="ava"
                        className={styles.ava}
                    />
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
    )
}