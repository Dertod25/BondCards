import React, {Component} from "react";
import List from "./List";
import CardArea from "./CardArea";
import "../style/App.css";

export default class App extends Component {

    render() {
        return (
            <div className="wrapper">
                <List />
                <CardArea/>
            </div>

        );
    }
}
