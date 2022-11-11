import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {UserOutlined} from '@ant-design/icons'

import {getCurrentUserEmail, getCurrentUserPhotos, getIsAuth, logout, useAppSelector} from 'store'

import {Avatar, Button, Col, Row} from 'antd'

import {NavLink} from 'react-router-dom'
import {Path} from 'enum'

import styles from './header.module.css'


export const Header: FC = () => {

    const dispatch = useDispatch()

    const email = useAppSelector(getCurrentUserEmail)
    const isAuth = useAppSelector(getIsAuth)
    const myPhotos = useAppSelector(getCurrentUserPhotos)

    const logoutHandle = () => {
        dispatch(logout())
    }

    return (
        <div className={`${styles.container}`}>
            <div className={styles.content}>
                {isAuth &&
                    <div>
                        <Row>
                            <Col span={24}>
                                <span className={styles.userEmail}>{email}</span>
                            </Col>
                        </Row>
                        <Row className={styles.contentRight}>
                            <Col span={12}>
                                {myPhotos
                                    ? <NavLink to={Path.PROFILE_PAGE}>
                                        <Avatar src={myPhotos.small} size="large" icon={<UserOutlined />} />
                                    </NavLink>
                                    : <Avatar size="large" icon={<UserOutlined />} />
                                }
                            </Col>
                            <Col span={12}>
                                <Button className={styles.logOutButton}
                                        size={'small'}
                                        onClick={logoutHandle}
                                >
                                    log out
                                </Button>
                            </Col>

                        </Row>
                    </div>
                }
            </div>
        </div>
    )
}

