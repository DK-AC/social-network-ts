import {ErrorMessage, Field} from 'formik';
import * as React from 'react';

type PropsType = {
    name: string
    type: string
    isShow: boolean
}

export const FormikField: React.FC<PropsType> = ({isShow, name, type}) => {
    return <div>
        <label htmlFor={name}>{name}</label>
        <Field name={name} type={type}/>
        {isShow && <ErrorMessage name={name}/>}
    </div>;
}