import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {getProfileUserStatus, setProfileUser} from '../../redux/reducers/profileReducer'
import {Nullable} from '../../types'
import {getCurrentUserId, getIsAuth} from '../../selectors/authSelectors'
import {getUserProfile} from '../../selectors/profileSelectors'

import {Paths} from '../../enum'

import {Posts} from './Posts'
import {ProfileInfo} from './ProfileInfo'
export const Profile: FC = () => {

    const dispatch = useDispatch()
    const params = useParams<'profileUserId'>()
    const navigate = useNavigate()

    const profile = useAppSelector(getUserProfile)
    const id = useAppSelector(getCurrentUserId)
    const isAuth = useAppSelector(getIsAuth)

    let profileUserId: Nullable<number>

    if (params.profileUserId) {
        profileUserId = Number(params.profileUserId)
    } else {
        profileUserId = id
    }

    useEffect(() => {
        if (!isAuth) {
            navigate(Paths.LOGIN_PAGE)
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

