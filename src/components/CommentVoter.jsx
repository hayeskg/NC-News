import React, { Component } from 'react';
import * as api from '../utils/api'

class CommentVoter extends Component {

  state = {
    userVotes: 0,
  };

  handleUpVote = () => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + 1,
      }
    })

    const { comment_id } = this.props;
    const { userVotes } = this.state;
    api.patchCommentByID(comment_id, userVotes).catch(err => {
      this.setState({ err: 'No API response.' });
    })
  }

  handleDownVote = () => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes - 1,
      }
    })

    const { comment_id } = this.props;
    const { userVotes } = this.state;
    api.patchCommentByID(comment_id, userVotes).catch(err => {
      this.setState({ err: 'No API response.' });
    })
  }

  render() {
    const {votes} = this.props;
    const {userVotes} = this.state;
    return (
      <>
        <p>Votes: {votes + userVotes}</p>
        <button onClick={this.handleUpVote}>
          <span role='img' aria-label='upvote'> 👍</span>
        </button>
        <button onClick={this.handleDownVote}>
          <span role='img' aria-label='downvote'> 👎</span>
        </button>
    <p>///temp///{userVotes}</p>
      </>
    );
  }
}

export default CommentVoter;