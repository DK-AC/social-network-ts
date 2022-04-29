import {Field} from 'formik';
import * as React from 'react';

type PropsType = {
    name: string
    type: string
    isShowError: boolean
    isShowLabel: boolean
    error: string
}

export const FormikField: React.FC<PropsType> = ({isShowError, name, type, isShowLabel, error}) => {
    return <>
        {isShowLabel && <label htmlFor={name}>{name}</label>}
        <Field name={name} type={type}/>
        {isShowError && <div style={{color: 'red'}}>{error}</div>}
    </>;
}