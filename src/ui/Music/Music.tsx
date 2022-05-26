import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {PATH} from '../Routing'
import {useAppSelector} from '../../redux/store'
import {getIsAuth} from '../../selectors/authSelectors'

export const Music: FC = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div>Music</div>
    )
}