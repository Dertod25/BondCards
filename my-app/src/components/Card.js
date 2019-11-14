import React, {Component} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";

export default class Card extends Component {

    render() {
        const {bondPoints, dataKey, dateOption} = this.props;
        const data = bondPoints.reduce((a, c, i) => (i >= dateOption ? [...a, ...c] : a), []);

        return (
            <div className="main__chart">
                <ResponsiveContainer className="chart__resp-container">
                    <LineChart data={data}>
                        <Line type="monotone" dataKey={dataKey.toLowerCase()} stroke="#8884d8" dot={false}/>
                        <CartesianGrid stroke="#ccc"/>
                        <Tooltip />
                        <XAxis dataKey="date" className="chart__xaxis" padding={{left: 10, right: 10}}
                               tickFormatter={(time) => moment(time).format("MM.DD")}/>
                        <YAxis padding={{top: 50}}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>

        );
    }
}
