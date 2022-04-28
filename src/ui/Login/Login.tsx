import 'react-app-polyfill/ie11';
import * as React from 'react';
import {useEffect} from 'react';
import {useFormik} from 'formik';
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
        }),
        onSubmit: (values: Values) => {
            dispatch(loginTC(values))
        },
    });

    useEffect(() => {
        if (isInitialized) {
            navigate(PATH.PROFILE_PAGE)
        }
        return
    }, [isInitialized])

    return (
        <div style={{width: '200px', margin: '0 auto'}}>
            <h1>Sign up</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        placeholder="john@acme.com"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        placeholder="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="rememberMe">Remember me?</label>
                    <input
                        id="rememberMe"
                        type="checkbox"
                        {...formik.getFieldProps('rememberMe')}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

