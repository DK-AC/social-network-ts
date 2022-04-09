import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Profile} from "./ui/Profile/Profile";

export const App = () => {
    return (
        <div className={'app-wrapper'}>
            <Profile/>
            <Header/>
            <Navbar/>
        </div>
    );
}

