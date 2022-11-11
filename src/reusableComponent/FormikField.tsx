import {Field} from 'formik'
import {FC} from 'react'

import {LoginUserType} from 'api'
import {ContactsUserType, Nullable, ProfileUserType} from 'types'


export type ContactsKeysType = keyof ContactsUserType
type ProfileUserKeysType = keyof ProfileUserType
type LoginKeysType = keyof LoginUserType

type PropsType = {
    name: ProfileUserKeysType | LoginKeysType | 'dialogMessage' | 'postMessage' | `contacts.${ContactsKeysType}` | 'term'
    type?: string
    isShowError?: boolean
    isShowLabel?: boolean
    error?: Nullable<string>
    placeholder?: string
}

export const FormikField: FC<PropsType> = ({
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
    </>
}