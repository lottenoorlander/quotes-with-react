import React, { Component } from "react";

class Quotes extends Component {
  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <p>By: {this.props.author}</p>
      </div>
    );
  }
}

export default Quotes;
