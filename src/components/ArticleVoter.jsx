import React, { Component } from 'react';
import * as api from '../utils/api'

class ArticleVoter extends Component {

  state = {
    userVotes: 0,
  };

  handleUpVote = () => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + 1,
      }
    })
    const {article_id} = this.props;
    const { userVotes } = this.state;
    api.patchArticleByID(article_id, userVotes).catch(err=>{
      this.setState({err: 'No API response.'});
    })
  }

  handleDownVote = () => {
    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes - 1,
      }
    })
    const { article_id } = this.props;
    const { userVotes } = this.state
    api.patchArticleByID(article_id, userVotes).catch(err => {
      this.setState({ err: 'No API response.' });
    })
  }

  render() {
    const {votes} = this.props
    const {userVotes} = this.state;
    if (this.state.err) return <p>{this.state.err}</p>
    return (
      <>
        <p>Votes: {votes + userVotes}</p>
        <button onClick={this.handleUpVote}>
          <span role='img' aria-label='upvote'> 👍</span>
        </button>
        <button onClick={this.handleDownVote}>
          <span role='img' aria-label='downvote'> 👎</span>
        </button>
    <p>///temp///{this.state.userVotes}</p>
      </>
    );
  }
}

export default ArticleVoter;