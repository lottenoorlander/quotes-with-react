import React, { Component } from "react";
import Quotes from "./Quotes";

class QuoteSearcher extends Component {
  state = {
    quotes: []
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(data =>
        data.results.map(quote => {
          return { ...quote, likedness: 0 };
        })
      )
      .then(dataWithLikes => this.updateQuotes(dataWithLikes))
      .catch(console.error);
  }

  updateQuotes = results => {
    this.setState({
      ...this.state,
      quotes: this.state.quotes.concat(results),
      fetching: true
    });
  };

  setLiked = (id, liked) => {
    this.setState(
      this.state.quotes.map(quote => {
        if (quote._id === id) {
          quote.likedness = liked;
        }
        return quote;
      })
    );
  };

  render() {
    return (
      <div>
        <h1>Quotes</h1>
        <p style={{ fontWeight: "bold" }}>
          Liked:
          {this.state.quotes.reduce((totalLikes, quote) => {
            return quote.likedness === 1 ? totalLikes + 1 : totalLikes;
          }, 0)}
          / Disliked:
          {this.state.quotes.reduce((totalDislikes, quote) => {
            return quote.likedness === -1 ? totalDislikes + 1 : totalDislikes;
          }, 0)}
        </p>
        <div>
          {!this.state.fetching && "Loading..."}
          {this.state.fetching &&
            this.state.quotes.map(quote => {
              return (
                <Quotes
                  key={quote._id}
                  id={quote._id}
                  text={quote.quoteText}
                  author={quote.quoteAuthor}
                  likedness={quote.likedness}
                  setLiked={this.setLiked}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default QuoteSearcher;
