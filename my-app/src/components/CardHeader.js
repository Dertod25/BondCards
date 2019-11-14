import React, {Component} from "react";

export default class CardHeader extends Component {

    render() {
        const {isin = '', corpTitle = '', founded = '', corpName = '', totalRatio = '', currency = ''} = this.props.bond;
        return (
            <div className="card-header">
                <div>
                    <h2>{corpTitle}</h2>
                    <h3>{isin}</h3>
                    <h4>{corpName},{founded}</h4>
                </div>
                <div>
                    <p>{totalRatio}</p>
                    <p>{currency}</p>
                </div>
            </div>

        );
    }
}
