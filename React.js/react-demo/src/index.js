import React from 'react';
import ReactDOM from 'react-dom';
import Main from './App';
import './index.scss';
import { Provider } from 'react-redux'
import store from './store/index.js'
const App = (
    <Provider store = {store}>
        <Main/>
    </Provider>
)
ReactDOM.render(App, document.getElementById('root'));