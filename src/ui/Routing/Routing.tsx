import {Route, Routes} from "react-router-dom";
import {Profile} from "../Profile/Profile";
import {Dialogs} from "../Dialogs/Dialogs";
import {News} from "../News/News";
import {Music} from "../Music/Music";
import {Settings} from "../Settings/Settings";
import {Friends} from "../Friends/Friends";
import {NotFound404} from "../NotFound404/NotFound404";
import React from "react";
import {StateType} from "../../redux/state";

type PropsType = { state: StateType }


export const Routing = ({state}: PropsType) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Profile posts={state.profilePage.posts}/>}/>
                <Route path="/profile" element={<Profile posts={state.profilePage.posts}/>}/>
                <Route path="/dialogs/*" element={<Dialogs dialogs={state.dialogsPage.dialogs}
                                                           messages={state.dialogsPage.messages}/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/friends" element={<Friends friends={state.sideBarPage.friends}/>}/>
                <Route path="/*" element={<NotFound404/>}/>
            </Routes>
        </>
    )
}
