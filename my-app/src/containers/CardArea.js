import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bondsActions from '../redux/modules/bonds';
import Card from '../components/Card';
import CardHeder from '../components/CardHeader';
import OptionsMenu from '../components/OptionsMenu';

@connect(
    state => ({
        currentChannels: state.socket.currentChannels,
    }),
    dispatch =>
        bindActionCreators(
            { ...bondsActions},
            dispatch
        )
)

export default class CardArea extends Component {

    render() {
        return (
            <div className="card-container">
                <CardHeder />
                <OptionsMenu/>
                <Card/>
            </div>

        );
    }
}
