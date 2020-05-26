import React from 'react';

const CommentCard = (props) => {
  return (
    <>
      <h3>Comment by: {props.author}</h3>
      <p>At: {props.created_at}</p>
      <p>{props.body}</p>
      <p>Votes: {props.votes}</p>
    </>
  );
};

export default CommentCard;