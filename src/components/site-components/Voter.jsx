import React, { Component } from 'react';
import * as api from '../../utils/api';
import ErrorDisplayer from '../error-components/ErrorDisplayer';
import SmallButton from '../styled-components/SmallButton'

class Voter extends Component {

  state = {
    userVotes: 0,
    type: '',
    err: '',
    isLoading: true,
  }

  handleVote = (vote) => {
    const { type } = this.state;
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + vote,

      }
    })
    if (type === 'article') {
      const { article_id } = this.props;
      api.patchArticleByID(article_id, vote)
        .catch(err => {
          this.setState({ err: err.response.data.msg });
        })
    } else if (type === 'comment') {
      const { comment_id } = this.props;
      api.patchCommentByID(comment_id, vote)
        .catch((err) => {
          this.setState({ err: err.response.data.msg });
        })
    }
  }

  componentDidMount() {
    const { type } = this.props;
    this.setState({ type: type, isLoading: false })
  }

  render() {
    const { votes } = this.props
    const { userVotes, err } = this.state;
    if (err) return <ErrorDisplayer msg={err} />
    if (this.state.err) return <p>{this.state.err}</p>
    return (
      <>
        <p>Votes: {votes + userVotes}</p>
        <SmallButton onClick={() => this.handleVote(1)} disabled={this.state.userVotes > 0}>
          <span role='img' aria-label='upvote'> 👍</span>
        </SmallButton>
        <SmallButton onClick={() => this.handleVote(-1)} disabled={this.state.userVotes < 0} >
          <span role='img' aria-label='downvote'> 👎</span>
        </SmallButton>
      </>
    );
  }
}

export default Voter;