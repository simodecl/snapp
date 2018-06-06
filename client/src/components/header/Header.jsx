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
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/gallery">Gallery</a></li>
					</ul>
				</nav>
				<div className="nav-spacer"></div>
			</div>
		)
	}
}
export default Header;