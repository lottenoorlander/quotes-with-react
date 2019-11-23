import React, { Component } from "react";
import Quotes from "./Quotes";

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    searchTerm: ""
  };

  search(searchTerm) {
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${encodeURIComponent(
        searchTerm
      )}`
    )
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
      quotes: results,
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

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ ...this.state, searchTerm: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.search(this.state.searchTerm);
    this.setState({ ...this.state, searching: true });
  }

  render() {
    return (
      <div>
        <h1>Quotes</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            name="search"
            onChange={this.handleChange.bind(this)}
            value={this.state.search}
          />
          <input type="submit" value="Search!" />
        </form>
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
          {!this.state.fetching && this.state.searching ? "Loading..." : ""}
          {this.state.fetching && this.state.quotes.length === 0
            ? "Nothing found"
            : ""}
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
