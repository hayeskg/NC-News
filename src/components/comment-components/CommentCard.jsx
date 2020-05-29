import React from 'react';
import CommentVoter from './CommentVoter';
import CommentDelete from './CommentDelete';


const CommentCard = (props) => {
  const { author, created_at, body, votes, comment_id, currentUser } = props;
  return (
    < div className={'comment'}>
      <h3 >Comment by: {author}</h3>
      <p>At: {created_at}</p>
      <p>{body}</p>
      <CommentVoter comment_id={comment_id} votes={votes} /><br />
      {author === currentUser &&
        <CommentDelete comment_id={comment_id} removeCommentFromState={props.removeCommentFromState} />
      }
    </ div>
  );
};

export default CommentCard;