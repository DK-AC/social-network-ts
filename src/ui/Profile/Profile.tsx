import React from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType} from "../../redux/store";
import {ProfilePageType} from "../../redux/reducers/profileReducer";

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

