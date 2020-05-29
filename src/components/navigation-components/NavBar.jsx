import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';
import Login from './Login';


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
        <button>
          <Link to='/'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Simpleicons_Places_home-front.svg/1024px-Simpleicons_Places_home-front.svg.png" height='40' width='40' alt="home icon" />
          </Link>
        </button>

        {/* <button>
          <Link to='/'>
            <img src="http://cdn.onlinewebfonts.com/svg/img_311846.svg" height='40' width='40' alt="login icon" />
          </Link>
        </button> */}
        <Login users={this.props.users} updateUser={this.props.updateUser} />
        <p>Topics:</p>
        {this.state.topics.map(({ slug }) => {
          return <button key={slug}> <Link to={`/articles/${slug}`}>#{slug}</Link> </button>
        })}
      </nav>
    );
  }
}

export default NavBar;