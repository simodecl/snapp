import React, { Component } from 'react';

/*
Styling
*/
import './Spinner.css';

class Spinner extends Component {
	render() {
		return (
		<div className={`circle ${this.props.startUpload ? 'circle-loader' : null} ${this.props.finishUpload ? 'load-complete' : null}`}>
            <div className={`${this.props.finishUpload ? 'checkmark' : null} draw`}></div>
        </div>
		)
	}
}
export default Spinner;