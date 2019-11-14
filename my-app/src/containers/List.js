import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as bondsActions from "../redux/modules/bonds";

@connect(
    state => ({
        bondsList: state.bonds.bondsList,
        currentBond: state.bonds.currentBond
    }),
    dispatch =>
        bindActionCreators(
            {...bondsActions},
            dispatch
        )
)

export default class List extends Component {

    render() {
        const {bondsList, changeBond, currentBond} = this.props;

        return (
            <div className="side-bar">
                <div className="side-bar__header">
                    <p>Bonds List</p>
                </div>
                <div className="list">{Object.keys(bondsList).map((isin, i) =>
                    <div key={i}
                         onClick={() => changeBond(isin)}
                         className={`btn btn-outline-info  btn-sm  list-item ${currentBond === isin ? 'active' : ''}`}
                    >{isin}</div>
                )}
                </div>
            </div>

        );
    }
}
