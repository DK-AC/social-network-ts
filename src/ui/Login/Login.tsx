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

type Values = { email: string, password: string, rememberMe: boolean }


export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isInitialized = useAppSelector(state => state.auth.isInitialized)

    const initialValues = {email: '', password: '', rememberMe: false}
    const validationSchema = {
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    }
    const onSubmitLoginUser = (values: Values) => {
        dispatch(loginTC(values))
    }

    useEffect(() => {
        if (isInitialized) {
            navigate(PATH.START_PAGE)
        }
        return
    }, [isInitialized])

    return (
        <div style={{width: '200px', margin: '0 auto'}}>
            <h1>Sign up</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={onSubmitLoginUser}
            >
                {formik => (
                    <Form>
                        <div>
                            <label htmlFor={'email'}>email</label>
                            <Field name={'email'} type={'email'}/>
                            <ErrorMessage name={'email'}/>
                        </div>
                        <div>
                            <label htmlFor={'password'}>password</label>
                            <Field name={'password'} type={'password'}/>
                            <ErrorMessage name={'password'}/>
                        </div>
                        <div>
                            <label htmlFor={'rememberMe'}>remember me?</label>
                            <Field name={'rememberMe'} type={'checkbox'}/>
                        </div>
                        <button disabled={!formik.isValid} type="submit">Sign Up</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

