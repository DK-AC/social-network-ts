import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostDataType} from "../../index";

type PropsType = { posts: PostDataType[] }

export const Profile = ({posts}: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <Posts posts={posts}/>
        </div>
    );
};

