import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api'


class NavBar extends Component {
  state = {
    topics: [
      // {
      //   "slug": "coding",
      //   "description": "Code is love, code is life"
      // },
      // {
      //   "slug": "football",
      //   "description": "FOOTIE!"
      // },
      // {
      //   "slug": "cooking",
      //   "description": "Hey good looking, what you got cooking?"
      //}
    ]
  }

  componentDidMount() {
    this.getTopics()
  }

  getTopics = () => {
    api.fetchTopics();
  }

  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link> </li>
          {this.state.topics.map(({ slug }) => {
            return <li key={slug}> <Link to={`/articles?topic=${slug}`}>{slug}</Link> </li>
          })}
        </ul>
      </nav>
    );
  }
}

export default NavBar;