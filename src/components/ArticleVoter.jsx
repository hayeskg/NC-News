import React, { Component } from 'react';
import * as api from '../utils/api'

class ArticleVoter extends Component {

  state = {
    userVotes: 0,
    upDisabled: false,
    downDisabled: false,
  };

  handleVote = (vote, disable) => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + vote,

      }
    })
    const { article_id } = this.props;
    api.patchArticleByID(article_id, vote)
      .catch(err => {
        this.setState({ err: 'No API response.' });
      })
  }

  render() {
    const { votes } = this.props
    const { userVotes, upDisabled, downDisabled } = this.state;
    if (this.state.err) return <p>{this.state.err}</p>
    return (
      <>
        <p>Votes: {votes + userVotes}</p>
        <button onClick={() => { this.handleVote(1, { upDisabled: true }) }} disabled={upDisabled}>
          <span role='img' aria-label='upvote'> 👍</span>
        </button>
        <button onClick={() => { this.handleVote(-1, { downDisabled: true }) }} disabled={downDisabled} >
          <span role='img' aria-label='downvote'> 👎</span>
        </button>
      </>
    );
  }
}

export default ArticleVoter;