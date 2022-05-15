import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Store } from './store';
import "./css/shards-dashboards.1.1.0.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/extras.1.1.0.min.css";
import "./css/style.css"

ReactDOM.render(
<Provider store={Store}>
    <App />
</Provider>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
