import React from 'react';
import {Field, Form, Formik, FormikValues} from 'formik';
import * as Yup from 'yup';
import {ObjectShape} from 'yup/lib/object';

type PropsType = {
    nameField: string
    initialValues: FormikValues
    onSubmit: (values: FormikValues) => void
    typeField: string
    nameButton: string
    validationSchema: ObjectShape
}


export const ReusableFormik: React.FC<PropsType> = (props) => {

    const {initialValues, nameButton, nameField, typeField, validationSchema, onSubmit} = props

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field name={nameField} type={typeField}/>
                    <button type="submit">{nameButton}</button>
                </Form>
            </Formik>
        </>
    );
};

