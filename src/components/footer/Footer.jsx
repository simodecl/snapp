import React, { Component } from 'react';

/*
Styling
*/
import './Footer.css';

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="social">
					<a href="https://www.facebook.com/pages/Arteveldehogeschool/101205926589914" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-facebook"></i>
					</a>
					<a href="https://www.instagram.com/arteveldehogeschool/" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-instagram"></i>
					</a>
					<a href="https://twitter.com/ArteveldehsGent" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-twitter"></i>
					</a>
					<a href="https://plus.google.com/106559721502057882839/posts" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-google"></i>
					</a>
					<a href="https://www.youtube.com/user/Arteveldehogeschool" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-youtube"></i>
					</a>
					<a href="https://www.linkedin.com/company/arteveldehogeschool" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-linkedin"></i>
					</a>
				</div>
				<div className="subfooter">
					<p>Webapp door&nbsp;<em>Simon Decloedt & Manaus Transez</em></p>
					<p>in opdracht van de Arteveldehogeschool <a href="http://www.arteveldehogeschool.be/"><img src="/assets/ahs.png" alt="AHS" /></a></p>
				</div>
			</footer>
		)
	}
}
export default Footer;