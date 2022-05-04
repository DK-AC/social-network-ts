import React from 'react';
import {useDispatch} from 'react-redux';

import {deletePostAC} from '../../../../redux/reducers/profileReducer';

import styles from './post.module.css';
import postPhoto from './../../../../assets/img/postPhoto.jpg';

type PropsType = {
    id: number
    message: string
    likesCount: number
}

export const Post: React.FC<PropsType> = React.memo(({id, message, likesCount}) => {

    const dispatch = useDispatch()

    const deletePost = () => {
        dispatch(deletePostAC(id))
    }

    return (
        <div className={styles.post}>
            <div className={`${styles.item}`}>
                <img
                    src={postPhoto}
                    alt="postPhoto"/>
                {message}
                <button onClick={deletePost}>X</button>
            </div>
            <span> like {likesCount}</span>
        </div>
    );
})