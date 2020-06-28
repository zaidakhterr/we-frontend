import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './SignOut.scss';

class SignOut extends Component {
	state = {
	    size: 'large',
	};

	handleSizeChange = e => {
	    this.setState({ size: e.target.value });
	};
	render() {
		const { size } = this.state;
		return (
			<Button
			className="button"
			type="primary" 
			shape="round" 
			size={size}>
	          Sign Out
	        </Button>
		);
	}
}

export default SignOut;

