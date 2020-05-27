import React, { Component } from 'react';
import * as api from '../utils/api'

class CommentVoter extends Component {

  state = {
    userVotes: 0,
  };

  handleVote = (vote) => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + vote,
      }
    })

    const { comment_id } = this.props;
    const { userVotes } = this.state;
    api.patchCommentByID(comment_id, userVotes).catch(err => {
      this.setState({ err: 'No API response.' });
    })
  }

  render() {
    const { votes } = this.props;
    const { userVotes } = this.state;
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

export default CommentVoter;