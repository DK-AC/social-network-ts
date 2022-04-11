import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostsDataType} from "../../index";

type PropsType = { posts: PostsDataType[] }

export const Profile = ({posts}: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <Posts posts={posts}/>
        </div>
    );
};

