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

    let userId: number;

    if (params.profileUserId) {
        userId = +params.profileUserId
    } else {
        userId = 19179
    }

    const user = useAppSelector(state => state.profile.profile)

    useEffect(() => {
        dispatch(setProfileUserTC(userId))
    }, [params])


    return (
        <div>
            <ProfileInfo user={user}/>
            <Posts/>
        </div>
    );
};

