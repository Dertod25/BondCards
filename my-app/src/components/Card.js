import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class Card extends Component {

    render() {
        const data = [{date: '02.07', uv: 22.5},
            {date: '05.07', uv: 35},
            {date: '09.07', uv: 44.5},
            {date: '15.07', uv: 70.6},
            {date: '19.07', uv: 55.3},
            {date: '22.07', uv: 73.3},
            {date: '27.07', uv: 22.2},
            {date: '31.07', uv: 17.8},
            {date: '02.08', uv: 34.6},
        ];

        return (
            <div className="">
                <ResponsiveContainer width="100%" minHeight={320}>
                <LineChart  data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <XAxis dataKey="date" />
                    <YAxis />
                </LineChart>
                </ResponsiveContainer>
            </div>

        );
    }
}
