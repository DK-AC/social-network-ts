import 'react-app-polyfill/ie11';
import * as React from 'react';
import {Field, Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';

import {loginTC} from '../../redux/reducers/authReducer';

type Values = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const Login = () => {

    const dispatch = useDispatch()

    return (
        <div style={{width: '200px', margin: '0 auto'}}>
            <h1>Sign up</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                }}
                onSubmit={(values: Values) => {
                    dispatch(loginTC(values))
                }}
            >
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="john@acme.com"
                            type="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <label htmlFor="rememberMe">Remember me?</label>
                        <Field
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    );
};

