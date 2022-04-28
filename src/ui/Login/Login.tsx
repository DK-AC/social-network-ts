import 'react-app-polyfill/ie11';
import * as React from 'react';
import {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';


import {loginTC} from '../../redux/reducers/authReducer';
import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';


type Values = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isInitialized = useAppSelector(state => state.auth.isInitialized)


    useEffect(() => {
        if (isInitialized) {
            navigate(PATH.PROFILE_PAGE)
        }
        return
    }, [isInitialized])

    return (
        <div style={{width: '200px', margin: '0 auto'}}>
            <h1>Sign up</h1>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string()
                        .min(3, 'password is short')
                        .required('Required'),
                })}
                onSubmit={(values: Values) => {
                    dispatch(loginTC(values))
                }}
            >
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" placeholder="john@acme.com" type="email"/>
                        <ErrorMessage name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" placeholder="password" type="password"/>
                        <ErrorMessage name="password"/>
                    </div>
                    <div>
                        <label htmlFor="rememberMe">Remember me?</label>
                        <Field name="rememberMe" type="checkbox"/>
                    </div>
                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    )
};

