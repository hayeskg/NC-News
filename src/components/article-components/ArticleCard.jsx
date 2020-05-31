import React from 'react';
import { Link } from '@reach/router'

const ArticleCard = ({ article_id, title, author, created_at, votes, comment_count }) => {
  const date = created_at.slice(0, 10) + ' at ' + created_at.slice(11, 19)
  return (
    <Link to={`/article/${article_id}`}>
      <article>
        <h2>{title}</h2>
        <p>___</p>
        <p>Author: {author}</p>
        <p>Posted: {date}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
      </article>
    </Link>
  );
};

export default ArticleCard;