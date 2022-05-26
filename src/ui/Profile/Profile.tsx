import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {getProfileUserStatus, setProfileUser} from '../../redux/reducers/profileReducer'
import {PATH} from '../Routing/Routing'

import {Nullable} from '../../types/Nullable'

import {Posts} from './Posts/Posts'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'

export const Profile: React.FC = () => {

    const dispatch = useDispatch()
    const params = useParams<'profileUserId'>()
    const navigate = useNavigate()

    const profile = useAppSelector(state => state.profile.profile)
    const {id, isAuth} = useAppSelector(state => state.auth)

    let profileUserId: Nullable<number>

    if (params.profileUserId) {
        profileUserId = +params.profileUserId
    } else {
        profileUserId = id
    }

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        } else {
            dispatch(setProfileUser(profileUserId as number))
            dispatch(getProfileUserStatus(profileUserId as number))
        }
    }, [dispatch, isAuth, navigate, profileUserId])


    return (
        <div>
            <ProfileInfo profile={profile} isOwner={profileUserId === id}/>
            <Posts/>
        </div>
    )
}

