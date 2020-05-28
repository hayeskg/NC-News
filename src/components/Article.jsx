import React, { Component } from 'react';
import * as api from '../utils/api';
import Loader from './Loader'
import CommentCard from './CommentCard';
import ArticleVoter from './ArticleVoter';
import CommentAdder from './CommentAdder';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  }

  componentDidMount() {
    Promise.all([this.getArcticleByID(), this.getCommentsByID()]);
  }

  getArcticleByID = () => {
    const { article_id } = this.props;
    api.fetchArticleByID(article_id).then((article) => {
      this.setState({ article, isLoading: false });
    })
  }

  getCommentsByID = () => {
    const { article_id } = this.props;
    api.fetchCommentsByID(article_id).then((comments) => {
      this.setState({ comments });
    })
  }

  render() {
    if (this.state.isLoading) return <Loader />
    const { title, body, author, votes, created_at, comment_count, article_id } = this.state.article;
    const { user } = this.props
    return (
      <article>
        <h2>{title}</h2>
        <h3>Author: {author}</h3>
        <p>Created: {created_at}</p>
        <p>{body}</p>
        <ArticleVoter article_id={article_id} votes={votes} />
        <p>Comments: {comment_count}</p>
        <CommentAdder currentUser={user} article_id={article_id} getCommentsByID={this.getCommentsByID} />
        {this.state.comments.map((comment) => {
          return <CommentCard key={comment.comment_id} {...comment} currentUser={user} getCommentsByID={this.getCommentsByID} />;
        })}
      </article>
    );
  }
}

export default Article;