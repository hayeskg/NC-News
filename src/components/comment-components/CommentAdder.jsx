import React, { Component } from 'react';
import * as api from '../utils/api'
import ErrorDisplayer from './ErrorDisplayer';

class CommentAdder extends Component {

  state = {
    comment_body: '',
    err: '',
  }

  handleCommentSubmit = (event) => {
    const { article_id, currentUser } = this.props;
    const { comment_body } = this.state;
    event.preventDefault();
    const newComment = {
      username: currentUser,
      body: comment_body,
    }
    api.postNewCommentByArticleID(article_id, newComment)
      .then((comment) => {
        this.props.addCommentToState(comment)
      })
      .then(() => {
        this.setState({ comment_body: '' });
      })
      .catch(err => {
        this.setState({ err: err.response.data.msg });
      })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }


  render() {
    const { err } = this.state;
    if (err) return <ErrorDisplayer msg={err} />
    return (
      <div className={'addComment'}>
        <h2>Add a Comment: </h2>
        <form onSubmit={this.handleCommentSubmit}>
          <label htmlFor='comment_body'>Comment: </label>
          <input onChange={this.handleInputChange} name='comment_body' value={this.state.comment_body} required />
          <button>Add!</button>
        </form>
      </div>
    );
  }
}

export default CommentAdder;