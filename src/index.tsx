import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";

export type PostsDataType = { id: number, message: string, likesCount: number }
export type DialogsDataType = { id: number, name: string }
export type MessagesDataType = { id: number, message: string }


const postsData: PostsDataType[] = [
    {id: 1, message: '1 post', likesCount: 20},
    {id: 2, message: '2 post', likesCount: 1},
    {id: 3, message: '3 post', likesCount: 55},
]

const dialogsItems: DialogsDataType[] = [
    {id: 1, name: 'Jenya'},
    {id: 2, name: 'Sasha'},
    {id: 3, name: 'Dima'},
    {id: 4, name: 'Rita'},
]

const messagesData: MessagesDataType[] = [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'let\'s go'},
    {id: 4, message: 'Stop'},
]


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App posts={postsData} dialogs={dialogsItems} messages={messagesData}/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
