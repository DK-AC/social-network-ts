import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';

import {Music} from '../Music/Music';
import {Friends} from '../Friends/Friends';
import {News} from '../News/News';
import {Login} from '../Login/Login';
import {NotFound404} from '../NotFound404/NotFound404';
import {Settings} from '../Settings/Settings';

export const PATH = {
    START_PAGE: '/profile',
    PROFILE_PAGE: '/profile/:profileUserId',
    USERS_PAGE: '/users/*',
    DIALOGS_PAGE: '/dialogs/*',
    NEWS_PAGE: '/news',
    MUSIC_PAGE: '/music',
    SETTINGS_PAGE: '/settings',
    FRIENDS_PAGE: '/friends',
    LOGIN_PAGE: '/login',
    NOT_FOUND_PAGE: '/*',
};

const Profile = React.lazy(async () => ({default: (await import('../Profile/Profile')).Profile}))
const Users = React.lazy(async () => ({default: (await import('../Users/Users')).Users}))
const Dialogs = React.lazy(async () => ({default: (await import('../Dialogs/Dialogs')).Dialogs}))


export const Routing: React.FC = () => {
    return (
        <>
            <React.Suspense fallback={<p> Loading...</p>}>
                <Routes>
                    <Route path="/" element={<Navigate to={PATH.START_PAGE}/>}/>
                    <Route path={PATH.START_PAGE} element={<Profile/>}/>
                    <Route path={PATH.PROFILE_PAGE} element={<Profile/>}/>
                    <Route path={PATH.USERS_PAGE} element={<Users/>}/>
                    <Route path={PATH.DIALOGS_PAGE} element={<Dialogs/>}/>
                    <Route path={PATH.NEWS_PAGE} element={<News/>}/>
                    <Route path={PATH.MUSIC_PAGE} element={<Music/>}/>
                    <Route path={PATH.SETTINGS_PAGE} element={<Settings/>}/>
                    <Route path={PATH.FRIENDS_PAGE} element={<Friends/>}/>
                    <Route path={PATH.LOGIN_PAGE} element={<Login/>}/>
                    <Route path={PATH.NOT_FOUND_PAGE} element={<NotFound404/>}/>
                </Routes>
            </React.Suspense>
        </>

    );
};
