import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import TransformComponent from '../../components/TransformComponent/TransformComponent';
/*
Component styles
*/
import './HomePage.css';
import bunnyears from './bunny-ears.png';
import dogface from './dog-face.png';

/* Require tracking */
require('tracking')
require('tracking/build/data/face')

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green'
    };
  }
  tracker = null

  componentDidMount () {
    const video = document.querySelector('#video');
    const dogFaceButton = document.getElementById('dog-face')
    const bunnyEarsButton = document.getElementById('bunny-ears')
    const captureButton = document.getElementById('capture')
    let overlayArray = [];
    const imgOutput = document.querySelector('#img-output');
    let blob;
    let img_b64;

    const img = new Image()
    let filterX = 0
    let filterY = 0
    let filterWidth = 0
    let filterHeight = 0

    function changePic (x, y, width, height, src) {
      img.src = src
      filterX = x
      filterY = y
      filterWidth = width
      filterHeight = height
    }

    function dogFace () {
      changePic(-0.4, -0.6, 1.6, 2.4, dogface)
    }

    dogFace()

    dogFaceButton.addEventListener('click', dogFace)

    bunnyEarsButton.addEventListener('click', () => {
      changePic(-0.5, -0.9, 2, 2, bunnyears)
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
    const dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ia], {type:mimeString});
    }
    

    captureButton.addEventListener('click', () => {
      
      ctx.drawImage(video, 0, 0)
      console.log(overlayArray)
      if(overlayArray.length > 0) {
        console.log(overlayArray[0])
        ctx.drawImage(img, overlayArray[0].x,
        overlayArray[0].y,
        overlayArray[0].width,
        overlayArray[0].height
        )
      }  
      //Get data from canvas
      img_b64 = hiddenCanvas.toDataURL('image/png');
      console.log(img_b64)
      //Create blob from DataURL
      blob = dataURItoBlob(img_b64)
      imgOutput.src = URL.createObjectURL(blob);
    });
    const stage = this.stageRef.getStage();
    const layer = this.overlayRef;
    stage.on('click', (e) => {
      // if click on empty area - remove all transformers
      console.log(layer)
      if (e.target === stage) {
        stage.find('Transformer').destroy();
        this.transformComponent = null;
        layer.batchDraw();
        console.log(e.target)
        return;
      } else {
      this.transformComponent = <TransformComponent attachTo={e.target} />; 
      layer.batchDraw();
      console.log(e.target)
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
  }
  
  componentWillUnmount () {
    this.tracker.removeAllListeners()
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render () {
    
    return (
      <main className="container column">
        <div className="buttons">
          <button id="dog-face">Dog face</button>
          <button id="bunny-ears">Bunny ears</button>
          <button onClick={this.captureImg} id="capture">Capture</button>
        </div>
        <div id="webcam" className="webcam">
          <video id="video" ref="cameraOutput" width="720" height="480" autoPlay loop muted></video>
          <canvas id="canvas" ref="canvas" width="720" height="480"></canvas>
        </div>
        <div id="img-output">
          <Stage width="720" height="480" ref={node => { this.stageRef = node}}>
            <Layer ref="hiddenCanvas">
            </Layer>
            <Layer ref={node => { this.overlayRef = node}}>
              <Text text="Try click on rect" />
              <Rect
                ref={node => { this.rectRef = node}}
                x={100}
                y={100}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
                draggable
              />
              <Rect
                ref={node => { this.rectRef = node}}
                x={20}
                y={20}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
                draggable
              />
              {this.transformComponent} 
            </Layer>
          </Stage>
        </div>
        <button id="save">Save stage</button>
      </main>
    )
  }
}

export default (HomePage);