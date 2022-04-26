import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';

export const News = () => {

    const navigate = useNavigate()

    const isInitialized = useAppSelector(state => state.auth.isInitialized);

    useEffect(() => {
        if (!isInitialized) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isInitialized])

    return (
        <div>News</div>
    );
};