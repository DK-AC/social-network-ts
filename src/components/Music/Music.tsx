import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {Empty} from 'antd'

import {Path} from '../../enum'
import {getIsAuth, useAppSelector} from '../../store'

export const Music: FC = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)

    useEffect(() => {
        if (!isAuth) {
            navigate(Path.LOGIN_PAGE)
        }
    }, [isAuth, navigate])

    return (
        <Empty />
    )
}