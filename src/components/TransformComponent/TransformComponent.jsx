import React, { Component } from 'react';
import { Transformer } from 'react-konva';

class TransformComponent extends Component {
    componentDidMount() {
      console.log(this.props.attachTo);
      this.transformer.attachTo(this.props.attachTo);
      this.transformer.getLayer().batchDraw();
    }
    render() {
      return (
        <Transformer
          ref={node => {
            this.transformer = node;
          }}
        />
      );
    }
  }

export default TransformComponent;