import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAppSelector} from '../../redux/store'
import {getIsAuth} from '../../redux/selectors/authSelectors'
import {Paths} from '../../enum'

export const Settings: FC = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(Paths.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <div>
            Settings
        </div>
    )
}

