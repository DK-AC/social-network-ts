import {Field} from 'formik';
import * as React from 'react';

type PropsType = {
    name: string
    type?: string
    isShowError?: boolean
    isShowLabel?: boolean
    error: string
    placeholder?: string
}

export const FormikField: React.FC<PropsType> = ({
                                                     isShowError,
                                                     name,
                                                     type = 'text',
                                                     isShowLabel,
                                                     error,
                                                     placeholder,
                                                 }) => {
    return <>
        {isShowLabel && <label htmlFor={name}>{name}</label>}
        <Field name={name} type={type} placeholder={placeholder}/>
        {isShowError && <div style={{color: 'red'}}>{error}</div>}
    </>;
}