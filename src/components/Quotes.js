import React, { Component } from "react";

class Quotes extends Component {
  state = {
    style: null
  };

  likeHandler = () => {
    this.setState({
      ...this.state,
      style: { color: "green", fontWeight: "bold" }
    });
  };

  dislikeHandler = () => {
    this.setState({
      ...this.state,
      style: { color: "red", textDecoration: "line-through" }
    });
  };

  render() {
    return (
      <div>
        <p style={this.state.style}>{this.props.text}</p>
        <p>
          By: {this.props.author}
          <button onClick={this.likeHandler}>:)</button>
          <button onClick={this.dislikeHandler}>:(</button>
        </p>
      </div>
    );
  }
}

export default Quotes;
