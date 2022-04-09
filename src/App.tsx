import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Profile} from "./ui/Profile/Profile";
import {Dialogs} from "./ui/Dialogs/Dialogs";

export const App = () => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Profile/>
                <Dialogs/>
            </div>
        </div>
    );
}

