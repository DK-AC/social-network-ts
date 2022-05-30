import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Empty} from 'antd'

import {Paths} from '../../enum'
import {getIsAuth, useAppSelector} from '../../store'

export const Settings: FC = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(Paths.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <Empty />
    )
}

