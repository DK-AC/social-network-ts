import React, {useRef} from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";
import {PostsDataType} from "../../../redux/state";

type PropsType = { posts: PostsDataType[] }

export const Posts = ({posts}: PropsType) => {

    const inputEl = useRef<HTMLInputElement>(null)

    const post = posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    const addPostHandle = () => {
        if (inputEl && inputEl.current) {
            alert(inputEl.current.value)
        }
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input ref={inputEl} placeholder={'post'}/>
                    <button onClick={addPostHandle}>Add post</button>
                </div>
            </div>
            {post}
        </div>
    );
};

