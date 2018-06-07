import React, { Component } from 'react';

/*
Styling
*/
import './Header.css';

class Header extends Component {
	render() {
		return (
			<div>
				<nav>
					<img src="/logo.svg" alt="Logo" />
					<span>Snapp</span>
				</nav>
				<div className="nav-spacer"></div>
			</div>
		)
	}
}
export default Header;