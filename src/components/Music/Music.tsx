import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {Paths} from '../../enum'
import {getIsAuth, useAppSelector} from '../../store'

export const Music: FC = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(Paths.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div>Music</div>
    )
}