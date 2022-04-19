import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Routing} from "./ui/Routing/Routing";
import {useDispatch} from "react-redux";
import {authMeTC} from "./redux/reducers/authReducer";


export const App: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    return (
        <div className={'app-wrapper'}><Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Routing/>
            </div>
        </div>
    )
}

