import React, {Component} from "react";

export default class CardHeader extends Component {

    render() {
        const {isin = '', corpTitle = '', founded = '', corpName = '', totalRatio = '', currency = ''} = this.props.bond;
        return (
            <div className="main__header">
                <div>
                    <h6>{corpTitle}</h6>
                    <span className="d-block">{isin}</span>
                    <span>{corpName},{founded}</span>
                </div>
                <div className="d-flex ">
                    <p className="mr-1">{totalRatio}</p>
                    <p>{currency}</p>
                </div>
            </div>

        );
    }
}
