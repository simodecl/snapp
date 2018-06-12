import React, { Component } from 'react';
/*
Component styles
*/
import './GalleryPage.css';

class GalleryPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: []
		}
	}

	componentWillMount() {
		const imagesStorage = JSON.parse(localStorage.getItem('gallery'));
		this.setState({
			images: imagesStorage
		})
	}

	render() {
		if (this.state.images != null && this.state.images.length >= 1) {
			return (
				<main className="container">
					<section className="gallery">
						<section className="left">
							<i className="fas fa-chevron-left"></i>
						</section>

						<section className="images">
						{this.state.images.map((el, i) => (
							<a href="/gallery/randomurl" key={el.date}>
								<div className="image" style={{ backgroundImage: 'url(' + el.image_url + ')' }}></div>
							</a>
						))}
						</section>

						<section className="right">
							<i className="fas fa-chevron-right"></i>
						</section>
					</section>
				</main>
			)
		} else {
			return (
				<main className="container">
					Sorry, we found nothing
				</main>
			)
		}

	}
}

export default (GalleryPage);