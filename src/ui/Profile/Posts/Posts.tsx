import React from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";

export const Posts = () => {

    const postsData = [
        {id: 1, message: '1 post', likesCount: 20},
        {id: 2, message: '2 post', likesCount: 1},
        {id: 3, message: '3 post', likesCount: 55},
    ]

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input type="text" placeholder={'post'}/>
                    <button>Add post</button>
                </div>
            </div>
            {postsData.map(p => {
                return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
            })}
        </div>
    );
};

