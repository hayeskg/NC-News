import React, { Component } from 'react';
import * as api from '../../utils/api';
import Loader from '../site-components/Loader'
import CommentCard from '../comment-components/CommentCard';
import Voter from '../site-components/Voter'
import CommentAdder from '../comment-components/CommentAdder';
import ErrorDisplayer from '../error-components/ErrorDisplayer';
import Select from '../styled-components/Select';
import SmallButton from '../styled-components/SmallButton'

class Article extends Component {
  state = {
    article: {},
    comments: [],
    filters: ['created_at', 'votes'],
    sort_by: '',
    order: 'desc',
    isLoading: true,
    err: '',
  }

  componentDidMount() {
    Promise.all([this.getArcticleByID(), this.getCommentsByID()]);
  }


  componentDidUpdate(prevProps, prevState) {
    const sortChanged = this.state.sort_by !== prevState.sort_by;
    const orderChanged = this.state.order !== prevState.order
    if (sortChanged || orderChanged) {
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
    const { sort_by, order } = this.state;
    api.fetchCommentsByID(article_id, sort_by, order)
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

  updateOrder = () => {
    if (this.state.order === 'asc') {
      this.setState({ order: 'desc', isLoading: false })
    } else {
      this.setState({ order: 'asc', isLoading: false })
    }
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
        <Voter article_id={article_id} votes={votes} type='article' />
        <p>Comments: {comment_count}</p>
        <div className='CommentsList'>
          <h2>Comments: </h2>
          <CommentAdder currentUser={user} article_id={article_id} addCommentToState={this.addCommentToState} />
          <Select onChange={(e) => { this.updateFilter(e.target.value) }} name="filters" id="filters" >
            {this.state.filters.map((filter, index) => {
              return <option key={index} value={filter}>{filter}</option>
            })}
          </Select>
          <SmallButton onClick={this.updateOrder}>
            <img src="https://image.flaticon.com/icons/svg/164/164018.svg" height='30' width='30' alt="sort icon" />
          </SmallButton>
          {this.state.comments.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} currentUser={user} removeCommentFromState={this.removeCommentFromState} />;
          })}
        </div>
      </article>
    );
  }
}

export default Article;