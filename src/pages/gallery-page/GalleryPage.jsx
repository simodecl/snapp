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

						<section className="images">
							{this.state.images.map((el, i) => (
								<a href={el.image_url} target="_blank" rel="noopener noreferrer" key={el.date}>
									<div className="image" style={{ backgroundImage: 'url(' + el.image_url + ')' }}></div>
								</a>
							))}
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