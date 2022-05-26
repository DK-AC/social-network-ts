import 'react-app-polyfill/ie11'
import * as React from 'react'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {LockOutlined, UserOutlined} from '@ant-design/icons'

import {Button, Form, Input, Spin} from 'antd'

import {login} from '../../redux/reducers/authReducer'
import {useAppSelector} from '../../redux/store'
import {PATH} from '../Routing/Routing'
import {LoginUserType} from '../../api/authAPI'

import logo from './../../assets/img/logoDK.svg'

import styles from './login.module.css'


export const Login: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isAuth, captchaURL} = useAppSelector(state => state.auth)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        if (isAuth) {
            navigate(PATH.PROFILE_PAGE)
        }
        return
    }, [dispatch, isAuth, navigate])

    const onSubmitLoginUser = (values: LoginUserType) => {
        dispatch(login(values))
    }


    return (
        <Form onFinish={onSubmitLoginUser} className={styles.loginHeader}>
            <img src={logo} className="App-logo" alt="logo"/>
            <Spin spinning={status === 'loading'}></Spin>
            <Form.Item name="email"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your Username!',
                           },
                       ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="Username" size={'large'}
                       type={'email'}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                    size={'large'}
                />
            </Form.Item>
            <Form.Item name="rememberMe" label={'Remember Me?'}>
                <Input type="checkbox" name={'rememberMe'}/>
            </Form.Item>

            {captchaURL
                ? <>
                    <img src={captchaURL} alt="captchaURL"/>
                    <Form.Item name="captcha">
                        <Input name={'captcha'} placeholder={'Symbols from image'}/>
                    </Form.Item>
                </>
                : null
            }
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>

            </Form.Item>
        </Form>
    )
}

