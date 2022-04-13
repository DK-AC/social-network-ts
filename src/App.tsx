import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {RootStoreType, StateType} from "./redux/state";
import {Routing} from "./ui/Routing/Routing";

type PropsType = {
    store: RootStoreType
    state: StateType
}

export const App: React.FC<PropsType> = ({store, state}) => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar friends={state.sideBarPage.friends}/>
            <div className={'app-wrapper-content'}>
                <Routing store={store} state={state}/>
            </div>
        </div>
    );
}

