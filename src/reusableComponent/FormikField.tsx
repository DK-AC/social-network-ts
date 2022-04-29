import {ErrorMessage, Field} from 'formik';
import * as React from 'react';

type PropsType = {
    name: string
    type: string
    isShowError: boolean
    isShowLabel: boolean
}

export const FormikField: React.FC<PropsType> = ({isShowError, name, type, isShowLabel}) => {
    return <>
        {isShowLabel && <label htmlFor={name}>{name}</label>}
        <Field name={name} type={type}/>
        {isShowError && <div style={{color: 'red'}}><ErrorMessage name={name}/></div>}
    </>;
}