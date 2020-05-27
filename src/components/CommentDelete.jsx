import React from 'react';
import * as api from '../utils/api';




class CommentDelete extends React.Component {

  handleDelete = () => {
    api.removeCommentByID(this.props.comment_id)
  }

  render() {
    return (
      <button onClick={this.handleDelete}>Delete Comment</button>
    );
  }

};

export default CommentDelete;