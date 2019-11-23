import React, { Component } from "react";
import Quotes from "./Quotes";
import AddQuotes from "./AddQuotes";

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
      .then(dataWithLikes => {
        this.updateQuotes(dataWithLikes);
      })
      .catch(console.error);
  }

  updateQuotes = results => {
    this.setState({
      ...this.state,
      quotes: this.state.quotes.concat(results),
      fetching: false,
      searching: true
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
    this.setState({ ...this.state, fetching: true });
  }

  buildDuplicatesFilter() {
    const duplicates = {};
    return function(quote) {
      if (!duplicates[quote.quoteText]) {
        duplicates[quote.quoteText] = 1;
        return true;
      }
    };
  }

  addQuote(text, name) {
    const newQuote = {
      _id: Math.round(Math.random() * 100000),
      quoteAuthor: name,
      quoteText: text,
      likedness: 0
    };
    this.setState({
      ...this.state,
      quotes: this.state.quotes.concat(newQuote)
    });
    console.log(this.state);
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
        <AddQuotes addQuote={this.addQuote.bind(this)} />
        <div>
          {this.state.fetching && "Loading..."}
          {this.state.searching && this.state.quotes.length === 0
            ? "Nothing found"
            : ""}
          {!this.state.fetching &&
            this.state.quotes.length >= 1 &&
            this.state.quotes
              .filter(this.buildDuplicatesFilter())
              .map(quote => {
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
