import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Loader from './Loader';
import ErrorDisplayer from './ErrorDisplayer'
import * as api from '../utils/api';

class ArticleList extends Component {
  state = {
    articles: [
    ],
    filters: ['Date', 'Comment count', 'Vote count'],
    isLoading: true,
    err: '',
  }

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      this.getArticles();
    }
  }

  getArticles = () => {
    const { topic } = this.props;
    api.fetchArticles(topic)
      .then((articles) => {
        this.setState({ articles, isLoading: false })
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false })
      })
  }

  render() {
    const { isLoading, err } = this.state;
    if (isLoading) return <Loader />
    if (err) return <ErrorDisplayer msg={err} />
    return (
      <main>
        <h2>Articles:</h2>
        <div>
          <label htmlFor="filters">Filter by: </label>
          <select name="filters" id="filters">
            {this.state.filters.map((filter, index) => {
              return <option key={index} value={filter}>{filter}</option>
            })}
          </select>
        </div>
        {this.state.articles.map(article => {
          return <li key={article.article_id}>
            <ArticleCard {...article} />
          </li>
        })}
      </main>
    );
  }
}

export default ArticleList;