import React, { Component } from 'react';
import * as api from '../../utils/api';
import Loader from '../site-components/Loader'
import CommentCard from '../comment-components/CommentCard';
import ArticleVoter from './ArticleVoter';
import CommentAdder from '../comment-components/CommentAdder';
import ErrorDisplayer from '../error-components/ErrorDisplayer';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    err: '',
  }

  componentDidMount() {
    Promise.all([this.getArcticleByID(), this.getCommentsByID()]);
  }

  getArcticleByID = () => {
    const { article_id } = this.props;
    api.fetchArticleByID(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false })
      })
  }

  getCommentsByID = () => {
    const { article_id } = this.props;
    api.fetchCommentsByID(article_id)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false })
      })
  }

  addCommentToState = (newComment) => {
    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] }
    })
  }
  removeCommentFromState = (comment_id) => {
    this.setState((currentState) => {
      const updatedCommments = currentState.comments.filter((comment) => {
        if (comment.comment_id !== comment_id) {
          return comment;
        }
        return null
      })
      return { comments: updatedCommments }
    })
  }

  render() {
    const { isLoading, err } = this.state;
    if (isLoading) return <Loader />
    if (err) return <ErrorDisplayer msg={err} />
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
        <CommentAdder currentUser={user} article_id={article_id} addCommentToState={this.addCommentToState} />
        {this.state.comments.map((comment) => {
          return <CommentCard key={comment.comment_id} {...comment} currentUser={user} removeCommentFromState={this.removeCommentFromState} />;
        })}
      </article>
    );
  }
}

export default Article;