import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type PropsType = {
    profilePage: ProfilePageType
    addPost: (message: string) => void
    updatePostText: (postText: string) => void
}

export const Profile = ({profilePage, addPost, updatePostText}: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <Posts profilePage={profilePage} addPost={addPost} updatePostText={updatePostText}/>
        </div>
    );
};

