import React, { Component } from "react";
import Quotes from "./Quotes";

class QuoteSearcher extends Component {
  state = {
    quotes: []
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(data => this.updateQuotes(data.results))
      .catch(console.error);
  }

  updateQuotes = results => {
    this.setState({
      ...this.state,
      quotes: this.state.quotes.concat(results),
      fetching: true
    });
  };

  render() {
    return (
      <div>
        <h1>Quotes</h1>
        <div>
          {!this.state.fetching && "Loading..."}
          {this.state.fetching &&
            this.state.quotes.map(quote => {
              return (
                <Quotes
                  key={quote._id}
                  text={quote.quoteText}
                  author={quote.quoteAuthor}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default QuoteSearcher;
