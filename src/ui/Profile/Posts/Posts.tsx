import React from 'react';
import {Post} from "./Post/Post";

export const Posts = () => {
    return (
        <div>
            My posts
            <div>
                <input type="text" placeholder={'post'}/>
                <button>Add post</button>
            </div>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
};

