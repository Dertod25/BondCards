import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import bonds from "./modules/bonds";

const reducer = combineReducers({
    bonds
});

export default function () {
    const store = createStore(
        reducer,
        applyMiddleware(logger)
    );

    return store;
}
