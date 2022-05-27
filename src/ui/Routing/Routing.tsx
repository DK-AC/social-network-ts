import {Navigate, Route, Routes} from 'react-router-dom'
import React, {FC} from 'react'

import {Music} from '../Music'
import {Friends} from '../Friends'
import {News} from '../News'
import {Login} from '../Login'
import {NotFound404} from '../NotFound404'
import {Settings} from '../Settings'
import {Paths} from '../../enum'

const Profile = React.lazy(async () => ({default: (await import('../Profile')).Profile}))
const Users = React.lazy(async () => ({default: (await import('../Users')).Users}))
const Dialogs = React.lazy(async () => ({default: (await import('../Dialogs/Dialogs')).Dialogs}))
const Chat = React.lazy(async () => ({default: (await import('../Chat/ChatPage')).ChatPage}))


export const Routing: FC = () => {
    return (
        <>
            <React.Suspense fallback={<p> Loading...</p>}>
                <Routes>
                    <Route path={Paths.START_PAGE} element={<Navigate to={Paths.PROFILE_PAGE}/>}/>
                    <Route path={Paths.PROFILE_PAGE} element={<Profile/>}/>
                    <Route path={Paths.PROFILE_USER_PAGE} element={<Profile/>}/>
                    <Route path={Paths.USERS_PAGE} element={<Users/>}/>
                    <Route path={Paths.DIALOGS_PAGE} element={<Dialogs/>}/>
                    <Route path={Paths.NEWS_PAGE} element={<News/>}/>
                    <Route path={Paths.MUSIC_PAGE} element={<Music/>}/>
                    <Route path={Paths.SETTINGS_PAGE} element={<Settings/>}/>
                    <Route path={Paths.FRIENDS_PAGE} element={<Friends/>}/>
                    <Route path={Paths.LOGIN_PAGE} element={<Login/>}/>
                    <Route path={Paths.CHAT_PAGE} element={<Chat/>}/>
                    <Route path={Paths.NOT_FOUND_PAGE} element={<NotFound404/>}/>
                </Routes>
            </React.Suspense>
        </>

    )
}
