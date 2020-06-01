import React from 'react';
import Voter from '../site-components/Voter';
import CommentDelete from './CommentDelete';


const CommentCard = ({ author, created_at, body, votes, comment_id, currentUser, removeCommentFromState }) => {
  const date = created_at.slice(0, 10) + ' at ' + created_at.slice(11, 19)
  return (
    < div className='comment'>
      <h3 >Comment by: {author}</h3>
      <p>Posted: {(date)}</p>
      <p>___</p>
      <p>{body}</p>
      <p>___</p>
      <Voter comment_id={comment_id} votes={votes} type='comment' /> <br />
      {author === currentUser &&
        <CommentDelete comment_id={comment_id} removeCommentFromState={removeCommentFromState} />
      }
    </ div>
  );
};

export default CommentCard;