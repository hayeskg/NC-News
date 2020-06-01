import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Loader from '../site-components/Loader';
import ErrorDisplayer from '../error-components/ErrorDisplayer'
import * as api from '../../utils/api';
import Select from '../styled-components/Select';
import SmallButton from '../styled-components/SmallButton';
import { Link } from '@reach/router';
import SquareButton from '../styled-components/SquareButton'



class ArticleList extends Component {
  state = {
    articles: [
    ],
    topics: [
    ],
    filters: ['created_at', 'comment_count', 'votes'],
    sort_by: '',
    order: 'desc',
    isLoading: true,
    err: '',
  }

  componentDidMount() {
    this.getArticles();
    this.getTopics();
  }

  componentDidUpdate(prevProps, prevState) {
    const topicChanged = this.props.topic !== prevProps.topic;
    const sortByChanged = this.state.sort_by !== prevState.sort_by;
    const orderChanged = this.state.order !== prevState.order;
    if (topicChanged || sortByChanged || orderChanged) {
      this.getArticles();
    }
  }

  getArticles = () => {
    const { topic } = this.props;
    const { sort_by, order } = this.state;
    api.fetchArticles(topic, sort_by, order)
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

  updateOrder = () => {
    if (this.state.order === 'asc') {
      this.setState({ order: 'desc', isLoading: false })
    } else {
      this.setState({ order: 'asc', isLoading: false })
    }
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false })
    })
  }


  render() {
    const { isLoading, err } = this.state;
    if (isLoading) return <Loader />
    if (err) return <ErrorDisplayer msg={err} />
    return (
      <main className='article-list'>
        <h2>Articles</h2>
        <div>
          <Select onChange={(e) => { this.updateFilter(e.target.value) }} name="filters" id="filters" >
            {this.state.filters.map((filter, index) => {
              return <option key={index} value={filter}>{filter}</option>
            })}
          </Select>
          <SmallButton onClick={this.updateOrder}>
            <img src="https://image.flaticon.com/icons/svg/164/164018.svg" height='30' width='30' alt="sort icon" />

          </SmallButton>
        </div>
        <h2>Topics</h2>
        {this.state.topics.map(({ slug }) => {
          return <Link key={slug} to={`/articles/${slug}`}><SquareButton> #{slug} </SquareButton></Link>
        })
        }
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