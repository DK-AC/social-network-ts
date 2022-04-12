import './index.css';
import reportWebVitals from './reportWebVitals';
import {store} from './redux/state';
import {createRoot} from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

const container = document.getElementById('root')
export const root = createRoot(container as Element)

let rerenderEntireTree = () => {
    return (
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App store={store}/>
                </BrowserRouter>
            </React.StrictMode>,
        )
    )
}

rerenderEntireTree()

store.subscribe(rerenderEntireTree)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
