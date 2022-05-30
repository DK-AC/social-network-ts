import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAppSelector} from '../../store/store'
import {getIsAuth} from '../../store/selectors/authSelectors'
import {Paths} from '../../enum'

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