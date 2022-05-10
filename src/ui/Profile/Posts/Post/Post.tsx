import React from 'react';
import {useDispatch} from 'react-redux';

import {deletePost} from '../../../../redux/reducers/profileReducer';

import styles from './post.module.css';
import postPhoto from './../../../../assets/img/postPhoto.jpg';

type PropsType = {
    postId: number
    message: string
    likesCount: number
}

export const Post: React.FC<PropsType> = React.memo(({ postId, message, likesCount}) => {

    const dispatch = useDispatch();

    const deletePostHandle = () => {
      dispatch(deletePost({postId}))
    }

    return (
        <div className={styles.post}>
            <div className={`${styles.item}`}>
                <img
                    src={postPhoto}
                    alt="postPhoto"/>
                {message}
                <button onClick={deletePostHandle}>X</button>
            </div>
            <span> like {likesCount}</span>
        </div>
    );
})