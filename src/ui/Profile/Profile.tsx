import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {useAppSelector} from '../../redux/store';
import {getProfileUserStatusTC, setProfileUserTC, updateProfileUserStatusTC} from '../../redux/reducers/profileReducer';
import {PATH} from '../Routing/Routing';

import {Posts} from './Posts/Posts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';


export const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const params = useParams<'profileUserId'>();
    const navigate = useNavigate()

    const user = useAppSelector(state => state.profile.profile);
    const userId = useAppSelector(state => state.auth.id);
    const isInitialized = useAppSelector(state => state.auth.isInitialized);
    const status = useAppSelector(state => state.profile.status)


    let profileUserId: number;

    if (params.profileUserId) {
        profileUserId = +params.profileUserId;
    } else {
        profileUserId = userId;
    }

    const updateStatus = (status: string) => {
        dispatch(updateProfileUserStatusTC(status))
    }

    useEffect(() => {
        if (!isInitialized) {
            navigate(PATH.LOGIN_PAGE)
        }
        dispatch(getProfileUserStatusTC(profileUserId))
        dispatch(setProfileUserTC(profileUserId));
    }, [profileUserId]);


    return (
        <div>
            <ProfileInfo user={user} status={status} updateStatus={updateStatus}/>
            <Posts/>
        </div>
    );
};

