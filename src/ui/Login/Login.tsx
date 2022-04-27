import 'react-app-polyfill/ie11';
import * as React from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';

type Values = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const Login = () => {
    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>,
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="john@acme.com"
                        type="email"
                    />

                    <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                    />

                    <label htmlFor="rememberMe">Remember me?</label>
                    <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                    />

                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    );
};

