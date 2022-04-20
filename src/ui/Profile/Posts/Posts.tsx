import React, {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';

import {addPostAC, updateNewPostTextAC} from '../../../redux/reducers/profileReducer';
import {useAppSelector} from '../../../redux/store';

import {Post} from './Post/Post';
import styles from './posts.module.css';


export const Posts: React.FC = () => {

    const dispatch = useDispatch();

    const posts = useAppSelector(state => state.profile.posts);
    const newPostText = useAppSelector(state => state.profile.newPostText);

    const post = posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>;
    });
    const addPostHandle = () => {
        dispatch(addPostAC(newPostText));
    };
    const updatePostTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewPostTextAC(e.currentTarget.value));
    };

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input value={newPostText}
                           onChange={updatePostTextHandle}
                           placeholder={'post'}
                    />
                    <button onClick={addPostHandle}>Add post</button>
                </div>
            </div>
            {post}
        </div>
    );
};

