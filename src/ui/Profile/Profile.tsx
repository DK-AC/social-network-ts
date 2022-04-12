import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type PropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updatePostText: (postText: string) => void
}

export const Profile: React.FC<PropsType> = ({profilePage, addPost, updatePostText}) => {
    return (
        <div>
            <ProfileInfo/>
            <Posts profilePage={profilePage} addPost={addPost} updatePostText={updatePostText}/>
        </div>
    );
};

