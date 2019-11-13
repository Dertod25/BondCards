import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bondsActions from '../redux/modules/bonds';
import List from './List';
import CardArea from './CardArea';
import '../style/App.css';

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

export default class App extends Component {
/*    componentDidMount() {
        this.props.changeChatType(true);
        this.props.changeCurrentChannel();
    }

    componentWillUnmount() {
        this.props.changeChatType(false);
        this.props.changeCurrentChannel();
    }*/

    render() {
/*        const { currentChannels } = this.props;
        const channels = [currentChannels[0]];*/
        return (
            <div className="area">
                <List />
                <CardArea/>
            </div>

        );
    }
}
