import React from 'react';
import * as api from '../utils/api';
import ErrorDisplayer from './ErrorDisplayer';




class CommentDelete extends React.Component {

  state = {
    err: '',
  }

  handleDelete = () => {
    api.removeCommentByID(this.props.comment_id)
      .then(() => {
        this.props.getCommentsByID()
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg })
      })
  }

  render() {
    const { err } = this.state;
    if (err) return <ErrorDisplayer msg={err} />
    return (
      <button onClick={this.handleDelete}>Delete Comment</button>
    );
  }

};

export default CommentDelete;