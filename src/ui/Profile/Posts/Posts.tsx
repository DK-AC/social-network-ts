import React, {ChangeEvent, useRef} from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";
import {ProfilePageType} from "../../../redux/state";

type PropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updatePostText: (postText: string) => void
}

export const Posts = ({profilePage, addPost, updatePostText}: PropsType) => {

    const inputEl = useRef<HTMLInputElement>(null)

    const post = profilePage.posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    const addPostHandle = () => {
            addPost()
    }
    const updatePostTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        updatePostText(e.currentTarget.value)
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input value={profilePage.postText} onChange={updatePostTextHandle} ref={inputEl}
                           placeholder={'post'}/>
                    <button onClick={addPostHandle}>Add post</button>
                </div>
            </div>
            {post}
        </div>
    );
};

