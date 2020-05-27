import React, { Component } from 'react';
import * as api from '../utils/api'

class CommentAdder extends Component {

  state = {
    comment_body: ''
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
      .then(() => {
        api.fetchCommentsByID(article_id);
      })
      .then(() => {
        this.setState({ comment_body: '' });
      })
      .catch(err => {
        this.setState({ err: 'No API response.' });
      })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }


  render() {
    return (
      <div className={'addComment'}>
        <h2>Add a Comment:</h2>
        <form onSubmit={this.handleCommentSubmit}>
          <label htmlFor='comment_body'>Comment:</label>
          <input onChange={this.handleInputChange} name='comment_body' value={this.state.comment_body} />
          <button>Add!</button>
        </form>
      </div>
    );
  }
}

export default CommentAdder;