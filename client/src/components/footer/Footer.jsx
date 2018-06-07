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
					<a href="https://www.facebook.com/pages/Arteveldehogeschool/101205926589914" target="_blank" className="icon fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
						<i className="fab fa-facebook fa-stack-1x faa-pulse animated-hover "></i>
					</a>
					<a href="https://www.instagram.com/arteveldehogeschool/" target="_blank" className="icon fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
						<i className="fab fa-instagram fa-stack-1x faa-pulse animated-hover "></i>
					</a>
					<a href="https://twitter.com/ArteveldehsGent" target="_blank" className="icon fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
						<i className="fab fa-twitter fa-stack-1x faa-pulse animated-hover "></i>
					</a>
					<a href="https://plus.google.com/106559721502057882839/posts" target="_blank" className="icon fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
						<i className="fab fa-google fa-stack-1x faa-pulse animated-hover "></i>
					</a>
					<a href="https://www.youtube.com/user/Arteveldehogeschool" target="_blank" className="icon fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
						<i className="fab fa-youtube-play fa-stack-1x faa-pulse animated-hover "></i>
					</a>
					<a href="https://www.linkedin.com/company/arteveldehogeschool" target="_blank" className="icon fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
						<i className="fab fa-linkedin fa-stack-1x faa-pulse animated-hover "></i>
					</a>
				</div>
			</footer>
		)
	}
}
export default Footer;