import React, { Component } from 'react';
import { Image } from 'react-konva';


class Sticker extends Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.image;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState(
        {
          image: image
        },
        () => {
          this.myImage.cache();
          this.myImage.getLayer().draw();
        }
      );
    };
    image.crossOrigin = "Anonymous";
  }

  render() {
    return (
     <Image
        image={this.state.image}
        ref={node => {
          this.myImage = node;
        }}
        width={350}
        height={350}
        onClick={this.props.onClick}
        draggable
      />
      
    );
  }
}

export default Sticker;