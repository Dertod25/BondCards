import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as bondsActions from "../redux/modules/bonds";
import Card from "../components/Card";
import CardHeder from "../components/CardHeader";
import OptionsMenu from "../components/OptionsMenu";

@connect(
    state => ({
        bondsParam: state.bonds,
    }),
    dispatch =>
        bindActionCreators(
            {...bondsActions},
            dispatch
        )
)

export default class CardArea extends Component {

    render() {
        const {bondsList, currentBond, bondsDataPoints, dateOption, typeOption} = this.props.bondsParam;
        const {changeDateOption, changeTypeOption} = this.props;
        const bond = currentBond ? bondsList[currentBond] : {};
        const bondPoints = bondsDataPoints[currentBond];
        return (
            <div className="card-container">
                <CardHeder bond={bond}/>
                <OptionsMenu changeDateOption={changeDateOption} changeTypeOption={changeTypeOption}
                             dateOption={dateOption} typeOption={typeOption}/>
                {bondPoints && <Card bondPoints={bondPoints} dataKey={typeOption} dateOption={dateOption}/>}
            </div>

        );
    }
}
