import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Profile} from "./ui/Profile/Profile";
import {Dialogs} from "./ui/Dialogs/Dialogs";
import {Route, Routes} from "react-router-dom";

export const App = () => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/" element={<Profile/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/*" element={<div>404 error</div>}/>
                </Routes>
            </div>
        </div>
    );
}

