import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./containers/App";
import getStore from "./redux/create";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/index.css";

const store = getStore();
const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);