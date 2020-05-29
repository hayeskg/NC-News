import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Loader from '../site-components/Loader';
import ErrorDisplayer from '../error-components/ErrorDisplayer'
import * as api from '../../utils/api';
import Select from '../styled-components/Select';


class ArticleList extends Component {
  state = {
    articles: [
    ],
    filters: ['created_at', 'comment_count', 'votes'],
    sort_by: '',
    isLoading: true,
    err: '',
  }

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const topicChanged = this.props.topic !== prevProps.topic;
    const sortByChanged = this.state.sort_by !== prevState.sort_by;
    if (topicChanged || sortByChanged) {
      this.getArticles();
    }
  }

  getArticles = () => {
    const { topic } = this.props;
    const { sort_by } = this.state;
    api.fetchArticles(topic, sort_by)
      .then((articles) => {
        this.setState({ articles, isLoading: false })
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false })
      })
  }

  updateFilter = (filter) => {
    this.setState({ sort_by: filter, isLoading: false })
  }

  log = (event) => {
    console.dir(event)
  }

  render() {
    const { isLoading, err } = this.state;
    if (isLoading) return <Loader />
    if (err) return <ErrorDisplayer msg={err} />
    return (
      <main className='article-list'>
        <h2>Articles:</h2>
        <div>
          <label htmlFor="filters">Filter by: </label><br />
          <Select onChange={(e) => { this.updateFilter(e.target.value) }} name="filters" id="filters" >
            {this.state.filters.map((filter, index) => {
              return <option key={index} value={filter}>{filter}</option>
            })}
          </Select>
        </div>
        {this.state.articles.map(article => {
          return <li className='article-card' key={article.article_id}>
            <ArticleCard {...article} />
          </li>
        })}
      </main>
    );
  }
}

export default ArticleList;