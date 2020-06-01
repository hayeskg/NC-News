import React from 'react';
import * as api from '../../utils/api';
import ErrorDisplayer from '../error-components/ErrorDisplayer';
import SquareButton from '../styled-components/SquareButton'




class CommentDelete extends React.Component {

  state = {
    err: '',
  }

  handleDelete = () => {
    const { comment_id, removeCommentFromState } = this.props;
    removeCommentFromState(comment_id)
    api.removeCommentByID(comment_id).catch((err) => {
      this.setState({ err: err.response.data.msg })
    })
  }

  render() {
    const { err } = this.state;
    if (err) return <ErrorDisplayer msg={err} />
    return (
      <SquareButton className='delete-button' onClick={this.handleDelete}>Delete</SquareButton>
    );
  }

};

export default CommentDelete;