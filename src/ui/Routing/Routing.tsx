import {Route, Routes} from "react-router-dom";
import {Profile} from "../Profile/Profile";
import {Dialogs} from "../Dialogs/Dialogs";
import {News} from "../News/News";
import {Music} from "../Music/Music";
import {Settings} from "../Settings/Settings";
import {Friends} from "../Friends/Friends";
import {NotFound404} from "../NotFound404/NotFound404";
import React from "react";
import {RootStoreType, StateType} from "../../redux/state";

type PropsType = {
    store: RootStoreType
    state: StateType
}

export const PATH = {
    START_PAGE: '/',
    PROFILE_PAGE: '/profile',
    DIALOGS_PAGE: '/dialogs',
    NEWS_PAGE: '/news',
    MUSIC_PAGE: '/music',
    SETTINGS_PAGE: '/settings',
    FRIENDS_PAGE: '/friends',
    NOT_FOUND_PAGE: '/*'
}


export const Routing: React.FC<PropsType> = ({store,state}) => {
    return (
        <>
            <Routes>
                <Route path={PATH.START_PAGE}
                       element={<Profile profilePage={state.profilePage}
                                         dispatch={store.dispatch.bind(store)}/>
                       }/>
                <Route path={PATH.PROFILE_PAGE}
                       element={<Profile profilePage={state.profilePage}
                                         dispatch={store.dispatch.bind(store)}/>
                       }/>
                <Route path={`${PATH.DIALOGS_PAGE}/*`}
                       element={<Dialogs dialogs={state.dialogsPage.dialogs}
                                         messages={state.dialogsPage.messages}/>
                       }/>
                <Route path={PATH.NEWS_PAGE} element={<News/>}/>
                <Route path={PATH.MUSIC_PAGE} element={<Music/>}/>
                <Route path={PATH.SETTINGS_PAGE} element={<Settings/>}/>
                <Route path={PATH.FRIENDS_PAGE} element={<Friends friends={state.sideBarPage.friends}/>}/>
                <Route path={PATH.NOT_FOUND_PAGE} element={<NotFound404/>}/>
            </Routes>
        </>
    )
}
