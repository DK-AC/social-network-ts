import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostsDataType} from "../../redux/state";

type PropsType = {
    posts: PostsDataType[]
    addPost: (message: string) => void
    updatePostText: (postText: string) => void
}

export const Profile = ({posts, addPost, updatePostText}: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <Posts posts={posts} addPost={addPost} updatePostText={updatePostText}/>
        </div>
    );
};

