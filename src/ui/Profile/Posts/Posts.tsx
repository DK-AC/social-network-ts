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
            <Post message={'1 post'} likesCount={5}/>
            <Post message={'2 post'} likesCount={10}/>
            <Post message={'3 post'} likesCount={1}/>
        </div>
    );
};

