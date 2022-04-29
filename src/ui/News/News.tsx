import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';

export const News = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth);

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isAuth])

    return (
        <div>News</div>
    );
};