import React from 'react';
import { Link } from '@reach/router'

const ArticleCard = (props) => {
  const { article_id, title, author, created_at, votes, comment_count } = props
  return (
    <article>
      <Link to={`/article/${article_id}`}><h2>{title}</h2></Link>
      <p>Author: {author}</p>
      <p>created_at: {created_at}</p>
      <p>votes: {votes}</p>
      <p>comments: {comment_count}</p>
    </article>
  );
};

export default ArticleCard;