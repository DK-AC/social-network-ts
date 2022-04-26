import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {PATH} from '../Routing/Routing';
import {useAppSelector} from '../../redux/store';

export const Music = () => {

    const navigate = useNavigate()

    const isInitialized = useAppSelector(state => state.auth.isInitialized);

    useEffect(() => {
        if (!isInitialized) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isInitialized])

    return (
        <div>Music</div>
    );
};