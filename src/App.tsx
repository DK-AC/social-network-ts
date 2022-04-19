import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {Routing} from "./ui/Routing/Routing";
import {useDispatch} from "react-redux";
import {authMeTC} from "./redux/reducers/appReducer";
import {useAppSelector} from "./redux/store";


export const App: React.FC = () => {

    const dispatch = useDispatch()

    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    return (
        <div>
            {isInitialized
                ? <div className={'app-wrapper'}><Header/>
                    <Navbar/>
                    <div className={'app-wrapper-content'}>
                        <Routing/>
                    </div>
                </div>
                : <div className={'center'}>Loading...</div>}
        </div>
    )
}

