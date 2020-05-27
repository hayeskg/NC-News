import React from 'react';
import CommentVoter from './CommentVoter';


const CommentCard = (props) => {
  const { author, created_at, body, votes, comment_id } = props;
  return (
    < div className={'comment'}>
      <h3 >Comment by: {author}</h3>
      <p>At: {created_at}</p>
      <p>{body}</p>
      <CommentVoter comment_id={comment_id} votes={votes} />
    </ div>
  );
};

export default CommentCard;