import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import socket from "./modules/bonds";

const reducer = combineReducers({
    socket,
});

export default function () {
    const store = createStore(
        reducer,
        applyMiddleware(logger)
    );

    return store;
}
