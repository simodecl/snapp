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
					<a href="/">
						<img src="/logo.svg" alt="Logo" />
						<span>Snapp</span>
					</a>
					<a className="to-gallery" href="/gallery">
						<span>Gallery</span>
					</a>
				</nav>
				<div className="nav-spacer"></div>
			</div>
		)
	}
}
export default Header;