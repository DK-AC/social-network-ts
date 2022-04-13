import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export const Profile: React.FC = () => {
    return (
        <div>
            <ProfileInfo/>
            <Posts/>
        </div>
    );
};

