import {Navigate, Route, Routes} from 'react-router-dom'
import React, {FC} from 'react'

import {Path} from 'enum'

import {Music} from '../Music'
import {Friends} from '../Friends'
import {News} from '../News'
import {Login} from '../Login'
import {NotFound404} from '../NotFound404'
import {Settings} from '../Settings'

const Profile = React.lazy(async () => ({default: (await import('../Profile')).Profile}))
const Users = React.lazy(async () => ({default: (await import('../Users')).Users}))
const Dialogs = React.lazy(async () => ({default: (await import('../Dialogs/Dialogs')).Dialogs}))
const Chat = React.lazy(async () => ({default: (await import('../Chat/ChatPage')).ChatPage}))


export const Routing: FC = () => {
    return (
        <>
            <React.Suspense fallback={<p> Loading...</p>}>
                <Routes>
                    <Route path={Path.START_PAGE} element={<Navigate to={Path.PROFILE_PAGE}/>}/>
                    <Route path={Path.PROFILE_PAGE} element={<Profile/>}/>
                    <Route path={Path.PROFILE_USER_PAGE} element={<Profile/>}/>
                    <Route path={Path.USERS_PAGE} element={<Users/>}/>
                    <Route path={Path.DIALOGS_PAGE} element={<Dialogs/>}/>
                    <Route path={Path.NEWS_PAGE} element={<News/>}/>
                    <Route path={Path.MUSIC_PAGE} element={<Music/>}/>
                    <Route path={Path.SETTINGS_PAGE} element={<Settings/>}/>
                    <Route path={Path.FRIENDS_PAGE} element={<Friends/>}/>
                    <Route path={Path.LOGIN_PAGE} element={<Login/>}/>
                    <Route path={Path.CHAT_PAGE} element={<Chat/>}/>
                    <Route path={Path.NOT_FOUND_PAGE} element={<NotFound404/>}/>
                </Routes>
            </React.Suspense>
        </>

    )
}
