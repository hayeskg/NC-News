import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';


class NavBar extends Component {
  state = {
    topics: [
    ]
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics })
    })
  }

  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link> </li>
          {this.state.topics.map(({ slug }) => {
            return <li key={slug}> <Link to={`/articles/${slug}`}>{slug}</Link> </li>
          })}
          <li><Link to='/'>Login</Link> </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;