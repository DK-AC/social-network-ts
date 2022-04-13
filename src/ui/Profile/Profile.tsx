import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType, ProfilePageType} from "../../redux/state";

type PropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const Profile: React.FC<PropsType> = ({profilePage, dispatch}) => {
    return (
        <div>
            <ProfileInfo/>
            <Posts profilePage={profilePage} dispatch={dispatch}/>
        </div>
    );
};

