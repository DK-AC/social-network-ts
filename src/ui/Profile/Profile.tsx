import React, {useEffect} from 'react';
import {Posts} from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/store";
import {setProfileUserTC} from "../../redux/reducers/profileReducer";
import {useParams} from "react-router-dom";

export const Profile: React.FC = () => {

    const dispatch = useDispatch()
    const params = useParams<'profileUserId'>()

    const user = useAppSelector(state => state.profile.profile)
    const userId = useAppSelector(state => state.auth.id)


    let profileUserId: number;

    if (params.profileUserId) {
        profileUserId = +params.profileUserId
    } else {
        profileUserId = userId
    }

    useEffect(() => {
        dispatch(setProfileUserTC(profileUserId))
    }, [params])


    return (
        <div>
            <ProfileInfo user={user}/>
            <Posts/>
        </div>
    );
};

