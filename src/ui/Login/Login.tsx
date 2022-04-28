import 'react-app-polyfill/ie11';
import * as React from 'react';
import {useEffect} from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

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
                        name="email"
                        placeholder="john@acme.com"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <div>
                    <label htmlFor="rememberMe">Remember me?</label>
                    <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

