import './index.css';
import {createRoot} from 'react-dom/client';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './redux/store';

const container = document.getElementById('root');
export const root = createRoot(container as Element);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
