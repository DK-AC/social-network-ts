import React from 'react';
import {Field, Form, Formik, FormikHelpers, FormikValues} from 'formik';
import * as Yup from 'yup';
import {ObjectShape} from 'yup/lib/object';

type PropsType = {
    name: string
    initialValues: FormikValues
    onSubmit: (values: FormikValues, action: FormikHelpers<FormikValues>) => void
    type: string
    nameButton: string
    validationSchema: ObjectShape
}


export const ReusableFormik: React.FC<PropsType> = (props) => {

    const {initialValues, nameButton, name, type, validationSchema, onSubmit} = props

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field name={name} type={type}/>
                    <button type="submit">{nameButton}</button>
                </Form>
            </Formik>
        </>
    );
};

