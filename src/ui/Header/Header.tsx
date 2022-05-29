import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Avatar, Button, Col, Layout, Row} from 'antd'
import {UserOutlined} from '@ant-design/icons'

import {useAppSelector} from '../../store/store'
import {logout} from '../../store/reducers/authReducer'
import {getCurrentUserEmail, getCurrentUserPhotos, getIsAuth} from '../../store'

import styles from './header.module.css'


export const Header: FC = () => {

    const dispatch = useDispatch()

    const email = useAppSelector(getCurrentUserEmail)
    const isAuth = useAppSelector(getIsAuth)
    const myPhotos = useAppSelector(getCurrentUserPhotos)

    const {Header} = Layout

    const logoutHandle = () => {
        dispatch(logout())
    }

    return (
        <Header className={`site-layout-background + ${styles.container}`}>
            <div className={styles.content}>
                {isAuth &&
                    <div>
                        <Row>
                            <Col span={24}><span className={styles.userEmail}>{email}</span></Col>
                        </Row>
                        <Row className={styles.contentRight}>
                            <Col span={12}>
                                {myPhotos
                                    ? <Avatar src={myPhotos.small} size="large" icon={<UserOutlined/>}/>
                                    : <Avatar size="large" icon={<UserOutlined/>}/>
                                }
                            </Col>
                            <Col span={12}>
                                <Button className={styles.logOutButton}
                                        size={'small'}
                                        onClick={logoutHandle}
                                > log out
                                </Button>
                            </Col>

                        </Row>
                    </div>
                }
            </div>
        </Header>
    )
}

