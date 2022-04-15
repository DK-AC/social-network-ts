import {Route, Routes} from "react-router-dom";
import {Profile} from "../Profile/Profile";
import {Dialogs} from "../Dialogs/Dialogs";
import {News} from "../News/News";
import {Music} from "../Music/Music";
import {Settings} from "../Settings/Settings";
import {Friends} from "../Friends/Friends";
import {NotFound404} from "../NotFound404/NotFound404";
import React from "react";
import {Users} from "../Users/Users";

export const PATH = {
    START_PAGE: '/profile',
    PROFILE_PAGE: '/profile/:userId',
    USERS_PAGE: '/users/*',
    DIALOGS_PAGE: '/dialogs/*',
    NEWS_PAGE: '/news',
    MUSIC_PAGE: '/music',
    SETTINGS_PAGE: '/settings',
    FRIENDS_PAGE: '/friends',
    NOT_FOUND_PAGE: '/*'
}


export const Routing: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path={PATH.START_PAGE} element={<Profile/>}/>
                <Route path={PATH.PROFILE_PAGE} element={<Profile/>}/>
                <Route path={PATH.USERS_PAGE} element={<Users/>}/>
                <Route path={PATH.DIALOGS_PAGE} element={<Dialogs/>}/>
                <Route path={PATH.NEWS_PAGE} element={<News/>}/>
                <Route path={PATH.MUSIC_PAGE} element={<Music/>}/>
                <Route path={PATH.SETTINGS_PAGE} element={<Settings/>}/>
                <Route path={PATH.FRIENDS_PAGE} element={<Friends/>}/>
                <Route path={PATH.NOT_FOUND_PAGE} element={<NotFound404/>}/>
            </Routes>
        </>
    )
}
