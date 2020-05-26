import React, { Component } from 'react';
import * as api from '../utils/api';
import Loader from './Loader'

class Article extends Component {
  state = {
    article: {},
    isLoading: true
  }

  componentDidMount() {
    this.getArcticleByID();
  }



  getArcticleByID = () => {
    const { article_id } = this.props;
    api.fetchArticleByID(article_id).then((article) => {
      this.setState({ article, isLoading: false });
    })
  }

  render() {
    if (this.state.isLoading) return <Loader />
    const { title, body, author, votes, created_at, comment_count } = this.state.article;
    return (
      <article>
        <h2>{title}</h2>
        <p>Author: {author}</p>
        <p>Created: {created_at}</p>
        <p>{body}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
      </article>
    );
  }
}

export default Article;