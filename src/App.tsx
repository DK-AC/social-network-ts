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

export const App = () => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/" element={<Profile/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/dialogs/*" element={<Dialogs/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/*" element={<NotFound404/>}/>
                </Routes>
            </div>
        </div>
    );
}

