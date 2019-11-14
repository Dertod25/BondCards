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
            <div className="list-container">
                <div className="card-header">
                    <p>ISIN List</p>
                </div>
                <div>{Object.keys(bondsList).map((isin, i) =>
                    <div key={i}
                         onClick={() => changeBond(isin)}
                         className={`cc ${currentBond === isin ? 'active' : ''}`}
                    >{isin}</div>
                )}
                </div>
            </div>

        );
    }
}
