import React, {FC} from 'react'

import styles from './messageItem.module.css'
import messagePhoto from './../../../assets/img/messagePhoto.png'

type PropsType = { id: number, message: string }

export const MessageItem: FC<PropsType> = React.memo(({id, message}) => {

    return (
        <div>
                <span className={styles.messageItem}>
                    {message}
                    <img
                        src={messagePhoto}
                        alt={'messagePhoto'}/>
            </span>
        </div>
    )
})

