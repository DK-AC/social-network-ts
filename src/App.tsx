import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Routing} from "./ui/Routing/Routing";


export const App: React.FC = () => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar />
            <div className={'app-wrapper-content'}>
                <Routing/>
            </div>
        </div>
);
}

