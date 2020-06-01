import React, { Component } from 'react';
import * as api from '../../utils/api';
import Loader from '../site-components/Loader'
import CommentCard from '../comment-components/CommentCard';
import ArticleVoter from './ArticleVoter';
import CommentAdder from '../comment-components/CommentAdder';
import ErrorDisplayer from '../error-components/ErrorDisplayer';
import Select from '../styled-components/Select'

class Article extends Component {
  state = {
    article: {},
    comments: [],
    filters: ['created_at', 'votes'],
    sort_by: '',
    isLoading: true,
    err: '',
  }

  componentDidMount() {
    Promise.all([this.getArcticleByID(), this.getCommentsByID()]);
  }


  componentDidUpdate(prevProps, prevState) {


    if (this.state.sort_by !== prevState.sort_by) {
      this.getCommentsByID();
    }
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
    const { sort_by } = this.state;
    api.fetchCommentsByID(article_id, sort_by)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
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
        return (comment.comment_id !== comment_id)
      })
      return { comments: updatedCommments }
    })
  }

  updateFilter = (filter) => {
    this.setState({ sort_by: filter, isLoading: false })
  }


  render() {
    const { isLoading, err } = this.state;
    if (isLoading) return <Loader />
    if (err) return <ErrorDisplayer msg={err} />
    const { title, body, author, votes, created_at, comment_count, article_id } = this.state.article;
    const date = created_at.slice(0, 10) + ' at ' + created_at.slice(11, 19);
    const { user } = this.props
    return (
      <article className='article'>
        <h2>{title}</h2>
        <p>___</p>
        <h3>Author: {author}</h3>
        <p>Posted: {date}</p>
        <p>___</p>
        <p>{body}</p>
        <p>___</p>
        <ArticleVoter article_id={article_id} votes={votes} />
        <p>Comments: {comment_count}</p>
        <div className='CommentsList'>
          <h2>Comments: </h2>

          <CommentAdder currentUser={user} article_id={article_id} addCommentToState={this.addCommentToState} />
          <Select onChange={(e) => { this.updateFilter(e.target.value) }} name="filters" id="filters" >
            {this.state.filters.map((filter, index) => {
              return <option key={index} value={filter}>{filter}</option>
            })}
          </Select>
          {this.state.comments.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} currentUser={user} removeCommentFromState={this.removeCommentFromState} />;
          })}
        </div>
      </article>
    );
  }
}

export default Article;