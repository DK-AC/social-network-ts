import {ErrorMessage, Field} from 'formik';
import * as React from 'react';

type PropsType = {
    name: string
    type: string
}

export const FieldFormik: React.FC<PropsType> = ({type, name}) => {
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <Field name={name} type={type}/>
            <ErrorMessage name={name}/>
        </>)
}