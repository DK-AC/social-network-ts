import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {PATH} from '../Routing/Routing'
import {useAppSelector} from '../../redux/store'

export const Music = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div>Music</div>
    )
}