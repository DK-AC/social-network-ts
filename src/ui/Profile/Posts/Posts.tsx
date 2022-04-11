import React from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";
import {PostDataType} from "../../../index";

type PropsType = { posts: PostDataType[] }

export const Posts = ({posts}: PropsType) => {

    const post = posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input type="text" placeholder={'post'}/>
                    <button>Add post</button>
                </div>
            </div>
            {post}
        </div>
    );
};

