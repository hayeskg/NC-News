import React, { Component } from 'react';
import * as api from '../utils/api'

class ArticleVoter extends Component {

  state = {
    userVotes: 0,
  };

  handleVote = (vote) => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + vote,
      }
    })
    const { article_id } = this.props;
    api.patchArticleByID(article_id, vote).catch(err => {
      this.setState({ err: 'No API response.' });
    })
  }

  render() {
    const { votes } = this.props
    const { userVotes } = this.state;
    if (this.state.err) return <p>{this.state.err}</p>
    return (
      <>
        <p>Votes: {votes + userVotes}</p>
        <button onClick={() => { this.handleVote(1) }}>
          <span role='img' aria-label='upvote'> 👍</span>
        </button>
        <button onClick={() => { this.handleVote(-1) }}>
          <span role='img' aria-label='downvote'> 👎</span>
        </button>
      </>
    );
  }
}

export default ArticleVoter;