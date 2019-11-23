import React, { Component } from "react";

class AddQuotes extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.addQuote(this.state.quoteText, this.state.quoteName);
  };

  handleChange = event => {
    this.setState({
      quoteText: event.target.value
    });
  };

  handleChange2 = event => {
    this.setState({
      quoteName: event.target.value
    });
  };

  render() {
    return (
      <div className="add-quote">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Quote:
            <input
              type="text"
              name="quote"
              onChange={this.handleChange.bind(this)}
              //   value={this.state.quote}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange2}
              //   value={this.state.name}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default AddQuotes;
