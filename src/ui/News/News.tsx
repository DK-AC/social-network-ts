import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {PATH} from '../Routing'
import {getIsAuth} from '../../selectors/authSelectors'

export const News: FC = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div>News</div>
    )
}