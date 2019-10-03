import React, { Component } from "react";

class Image extends Component {
  //Your handler Component
  addDefaultSrc = ev => {
    ev.target.src = this.props.fallBackSrc;
  };

  render() {
    return (
      <img
        onError={this.addDefaultSrc}
        className="img-responsive"
        src={this.props.src}
        alt={this.props.alt}
        width={this.props.size}
      />
    );
  }
}

export default Image;
