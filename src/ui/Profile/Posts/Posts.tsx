import React from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";

export const Posts = () => {
    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input type="text" placeholder={'post'}/>
                    <button>Add post</button>
                </div>
            </div>
            <Post message={'1 post'} likesCount={5}/>
            <Post message={'2 post'} likesCount={10}/>
            <Post message={'3 post'} likesCount={1}/>
        </div>
    );
};

