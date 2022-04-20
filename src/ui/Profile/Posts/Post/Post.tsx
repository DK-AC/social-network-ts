import React from 'react';

import styles from './post.module.css';
import postPhoto from './../../../../assets/img/postPhoto.jpg';

type PropsType = {
    id: number
    message: string
    likesCount: number
}

export const Post: React.FC<PropsType> = ({id, message, likesCount}) => {
    return (
        <div className={styles.post}>
            <div className={`${styles.item}`}>
                <img
                    src={postPhoto}
                    alt="postPhoto"/>
                {message}
            </div>
            <span> like {likesCount}</span>
        </div>
    );
};