import React, {FC} from 'react'

import styles from './friendItem.module.css'
import friendsPhoto from './../../../assets/img/friendsPhoto.jpg'

type PropsType = { id: number, name: string }

export const FriendItem: FC<PropsType> = ({id, name}) => {
    return (
        <div>
            <span className={styles.friendItem}>
                <img
                    src={friendsPhoto}
                    alt="friendsPhoto"/>
                {name}
            </span>
        </div>
    )
}