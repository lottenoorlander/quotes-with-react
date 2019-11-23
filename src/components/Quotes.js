import React, { Component } from "react";

class Quotes extends Component {
  state = {};

  likeHandler = () => {
    this.props.setLiked(this.props.id, 1);
  };

  dislikeHandler = () => {
    this.props.setLiked(this.props.id, -1);
  };

  render() {
    return (
      <div>
        <p
          style={
            this.props.likedness === 0
              ? { color: "black" }
              : this.props.likedness === 1
              ? { color: "green", fontWeight: "bold" }
              : { color: "red", textDecoration: "line-through" }
          }
        >
          {this.props.text}
        </p>
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
