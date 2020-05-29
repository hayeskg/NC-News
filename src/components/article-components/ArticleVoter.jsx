import React, { Component } from 'react';
import * as api from '../../utils/api';
import ErrorDisplayer from '../error-components/ErrorDisplayer';
import Button from '../styled-components/Button'

class ArticleVoter extends Component {

  state = {
    userVotes: 0,
    err: '',
  };

  handleVote = (vote) => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + vote,

      }
    })
    const { article_id } = this.props;
    api.patchArticleByID(article_id, vote)
      .catch(err => {
        this.setState({ err: err.response.data.msg });
      })
  }

  render() {
    const { votes } = this.props
    const { userVotes, err } = this.state;
    if (err) return <ErrorDisplayer msg={err} />
    if (this.state.err) return <p>{this.state.err}</p>
    return (
      <>
        <p>Votes: {votes + userVotes}</p>
        <Button onClick={() => this.handleVote(1)} disabled={this.state.userVotes > 0}>
          <span role='img' aria-label='upvote'> 👍</span>
        </Button>
        <Button onClick={() => this.handleVote(-1)} disabled={this.state.userVotes < 0} >
          <span role='img' aria-label='downvote'> 👎</span>
        </Button>
      </>
    );
  }
}

export default ArticleVoter;