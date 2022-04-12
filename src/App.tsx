import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Profile} from "./ui/Profile/Profile";
import {Dialogs} from "./ui/Dialogs/Dialogs";
import {Route, Routes} from "react-router-dom";
import {NotFound404} from "./ui/NotFound404/NotFound404";
import {News} from "./ui/News/News";
import {Music} from "./ui/Music/Music";
import {Settings} from "./ui/Settings/Settings";
import {StateType} from "./redux/state";
import {Friends} from "./ui/Friends/Friends";

type PropsType = {
    state: StateType
}

export const App = ({state}: PropsType) => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar friends={state.sideBarPage.friends}/>
            <div className={'app-wrapper-content'}>
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

            </div>
        </div>
    );
}

