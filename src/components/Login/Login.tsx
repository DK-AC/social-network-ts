import {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons'
import {Button, Checkbox, Form, Input, Spin} from 'antd'

import {LoginUserType} from '../../api'
import {Path} from '../../enum'
import {getAppError, getAppStatus, getCaptchaUrl, getIsAuth, login, useAppSelector} from '../../store'
import {ErrorMessage} from '../common'

import logo from './../../assets/img/logoDK.svg'
import styles from './login.module.css'


export const Login: FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)
    const captchaURL = useAppSelector(getCaptchaUrl)
    const status = useAppSelector(getAppStatus)
    const error = useAppSelector(getAppError)

    useEffect(() => {
        if (isAuth) {
            navigate(Path.PROFILE_PAGE)
        }
        return
    }, [dispatch, isAuth, navigate])

    const onSubmitLoginUser = (values: LoginUserType) => {
        dispatch(login(values))
    }


    return (
        <>
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
                    <Input.Password
                        placeholder="Password"
                        size={'large'}
                    />
                </Form.Item>
                <Form.Item name="rememberMe" valuePropName="checked">
                    <Checkbox style={{color: '#C6C6C7FF'}}>Remember me?</Checkbox>
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
                    <Button type="default"
                            htmlType="submit"
                            className="login-form-button"
                    >
                        Log in
                    </Button>

                </Form.Item>

            </Form>

            {error && <ErrorMessage/>}
        </>
    )
}

