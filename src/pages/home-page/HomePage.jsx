import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import TransformComponent from '../../components/TransformComponent/TransformComponent';
import Sticker from '../../components/Sticker/Sticker';
import request from 'superagent';
import Spinner from '../../components/Spinner/Spinner';
/*
Component styles
*/
import './HomePage.css';
import pdp from '../../images/pdp.png';
import oneminute from '../../images/oneminute.png';
import snapp from '../../images/snapp.svg';
import laugh from '../../images/laugh.png';
import empty from '../../images/empty.png';
import nmd from '../../images/nmd.svg';
import cmo from '../../images/cmo.svg';
import avd from '../../images/avd.svg';
import gmb from '../../images/gmb.svg';

const CLOUDINARY_UPLOAD_PRESET = 'snapp-gdm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/simodecl/upload';

/* Require tracking */
require('tracking')
require('tracking/build/data/face')

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stickers: [],
			transformComponent: null,
			picture: '',
			captured: false,
      stickerList: false,
      startUpload: false,
      finishUpload: false
		};
		this.toggleStickers = this.toggleStickers.bind(this);
	}
	tracker = null

	componentDidMount() {
		const video = document.querySelector('#video');
		const normalButton = document.getElementById('normal')
		const nmdButton = document.getElementById('nmd')
		const avdButton = document.getElementById('avd')
		const gmbButton = document.getElementById('gmb')
		const cmoButton = document.getElementById('cmo')
		const captureButton = document.getElementById('capture')
		let overlayArray = [];
		let img_b64;

		const img = new Image()
		let filterX = 0
		let filterY = 0
		let filterWidth = 0
		let filterHeight = 0

		function changePic(x, y, width, height, src) {
			img.src = src
			filterX = x
			filterY = y
			filterWidth = width
			filterHeight = height
		}

		normalButton.addEventListener('click', () => {
			changePic(-0.4, -0.6, 1.6, 2.4, empty)
		})

		nmdButton.addEventListener('click', () => {
			changePic(-0.2, -0.6, 1.4, 1.8, nmd)
		})

		avdButton.addEventListener('click', () => {
			changePic(-0.25, -0.6, 1.4, 1.8, avd)
		})

		gmbButton.addEventListener('click', () => {
			changePic(-0.2, -0.75, 1.4, 1.8, gmb)
		})

		cmoButton.addEventListener('click', () => {
			changePic(-0.25, -0.6, 1.4, 1.8, cmo)
		})

		this.tracker = new window.tracking.ObjectTracker('face')
		this.tracker.setInitialScale(4)
		this.tracker.setStepSize(2)
		this.tracker.setEdgesDensity(0.1)

		window.tracking.track(this.refs.cameraOutput, this.tracker, { camera: true })
		this.tracker.on('track', event => {
			let context = this.refs.canvas.getContext('2d')
			context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
			overlayArray = [];
			event.data.forEach(rect => {
				overlayArray.unshift({
					image: img,
					x: rect.x + (filterX * rect.width),
					y: rect.y + (filterY * rect.height),
					width: rect.width * filterWidth,
					height: rect.height * filterHeight
				})

				context.drawImage(img, rect.x + (filterX * rect.width),
					rect.y + (filterY * rect.height),
					rect.width * filterWidth,
					rect.height * filterHeight
				)
			})
		})
		const hiddenCanvas = this.refs.hiddenCanvas;
		const ctx = hiddenCanvas.getContext('2d');

		captureButton.addEventListener('click', () => {

			ctx.drawImage(video, 0, 0, 610, 455)
			console.log(overlayArray)
			if (overlayArray.length > 0) {
				console.log(overlayArray[0])
				ctx.drawImage(img, overlayArray[0].x,
					overlayArray[0].y,
					overlayArray[0].width,
					overlayArray[0].height
				)
			}
			this.setState({ captured: true });
			//Get data from canvas
			img_b64 = hiddenCanvas.toDataURL('image/png');
			console.log(img_b64)
		});

		const stage = this.stageRef.getStage();
		const layer = this.overlayRef;
		stage.on('click', (e) => {
			// if click on empty area - remove all transformers
			console.log(layer)
			if (e.target === stage) {
				stage.find('Transformer').destroy();
				this.setState({
					transformComponent: null
				});
				//layer.batchDraw();
				console.log(this.state.transformComponent)
				return;
			}
		})

		function downloadURI(uri, name) {
			let link = document.createElement("a");
			link.download = name;
			link.href = uri;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
		const saveButton = document.getElementById('save')
		saveButton.addEventListener('click', () => {
			const dataURL = stage.toDataURL("image/png");
			console.log(dataURL)
			downloadURI(dataURL, 'stage.png');
		}, false);

		const uploadButton = document.getElementById('uploadDataUrl')
		uploadButton.addEventListener('click', () => {
      this.setState({ startUpload: true });
			const dataURL = stage.toDataURL("image/png");
			let upload = request.post(CLOUDINARY_UPLOAD_URL)
				.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
				.field('file', dataURL);

			upload.end((err, response) => {
				if (err) {
					console.error(err);
				}

				if (response.body.secure_url !== '') {
					this.setState({
						picture: response.body.secure_url
					});
				}
				if (localStorage.getItem('gallery')) {
					const gallery = JSON.parse(localStorage.getItem('gallery'));
					gallery.unshift({ "image_url": this.state.picture, "date": new Date() });
					localStorage.setItem('gallery', JSON.stringify(gallery));
				}
				else {
					localStorage.setItem('gallery', JSON.stringify([{ "image_url": this.state.picture, "date": new Date() }]));
				}
				this.setState({ finishUpload: true });
			});

		});

	}

	componentWillUnmount() {
		this.tracker.removeAllListeners()
	}
	handleClick = (e) => {
		this.setState({
			transformComponent: <TransformComponent attachTo={e.target} />
		});
		//this.overlayRef.batchDraw();
		console.log(this.state.transformComponent)
	};

	toggleStickers() {
		const currentState = this.state.stickerList;
		this.setState({ stickerList: !currentState });
	};

	addSticker = (sticker) => {
		this.setState({
			stickers: [<Sticker key={new Date().toJSON()} onClick={this.handleClick} image={sticker} />, ...this.state.stickers]
		})
		this.toggleStickers();

	}

	render() {

		return (
			<main className="container column">
				<div className="buttons">
					<button id="normal">No face filter</button>
					<button id="nmd">NMD</button>
					<button id="avd">AVD</button>
					<button id="gmb">GMB</button>
					<button id="cmo">CMO</button>
					<button onClick={this.captureImg} id="capture">Capture</button>
				</div>
				<div id="webcam" className="webcam">
					<video id="video" ref="cameraOutput" width="620" height="465" autoPlay loop muted></video>
					<canvas id="canvas" ref="canvas" width="620" height="465"></canvas>
				</div>
				<div id="img-output">
					<Stage width="610" height="455" ref={node => { this.stageRef = node }}>
						<Layer ref="hiddenCanvas">
						</Layer>
						<Layer ref={node => { this.overlayRef = node }}>
							{this.state.stickers.map((sticker) => { return sticker })}
							{this.state.transformComponent}
						</Layer>
					</Stage>
				</div>
				<div className={`stickerList ${this.state.stickerList ? 'stickerList-active' : null}`}>
					<img onClick={() => this.addSticker(snapp)} src={snapp} alt="sticker" />
					<img onClick={() => this.addSticker(oneminute)} src={oneminute} alt="sticker" />
					<img onClick={() => this.addSticker(pdp)} src={pdp} alt="sticker" />
					<img onClick={() => this.addSticker(laugh)} src={laugh} alt="sticker" />
				</div>
				<div className={`buttons-2 ${this.state.captured ? 'buttons-2-active' : null}`}>
					<a href="/"><button>New picture</button></a>
					<button onClick={this.toggleStickers} id="addSticker">Add sticker</button>
					<button id="save">Save picture</button><button id="uploadDataUrl">Upload to Cloudinary</button>
				</div>
        <container className="spinnerContainer"><Spinner startUpload={this.state.startUpload} finishUpload={this.state.finishUpload} /></container>
			</main>
		)
	}
}

export default (HomePage);