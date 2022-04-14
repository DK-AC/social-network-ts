import React from "react";
import {UserType} from "../../../redux/reducers/usersReducer";
import styles from './user.module.css'

type PropsType = {
    user: UserType
}

export const User: React.FC<PropsType> = ({user}) => {

    const {id, name, photos, followed, status} = user

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
                        ? <button onClick={() => {
                        }}>Unfollow</button>
                        : <button onClick={() => {
                        }}>Follow</button>
                    }
                </div>
            </div>

        </div>
    )
}