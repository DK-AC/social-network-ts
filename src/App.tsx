import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {RootStoreType} from "./redux/state";
import {Routing} from "./ui/Routing/Routing";

type PropsType = {
    store: RootStoreType
}

export const App: React.FC<PropsType> = ({store}) => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar friends={store.getState().sideBarPage.friends}/>
            <div className={'app-wrapper-content'}>
                <Routing store={store}/>
            </div>
        </div>
    );
}

