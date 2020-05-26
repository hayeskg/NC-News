import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Loader from './Loader';
import * as api from '../utils/api';

class ArticleList extends Component {
  state = {
    articles: [
    ],
    isLoading: true,
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
    api.fetchArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false })
    })
  }

  render() {
    if (this.state.isLoading) return <Loader />
    return (
      <main>
        <h2>Articles:</h2>
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