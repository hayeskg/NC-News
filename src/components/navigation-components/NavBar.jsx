import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../../utils/api';
import Login from './Login';
import Button from '../styled-components/Button'


class NavBar extends Component {
  state = {
    topics: [
    ],
    isLoading: true,
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false })
    })
  }

  render() {
    return (
      <nav className='navbar' >
        <Button>
          <Link to='/'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Simpleicons_Places_home-front.svg/1024px-Simpleicons_Places_home-front.svg.png" height='40' width='40' alt="home icon" />
          </Link>
        </Button>
        <Login users={this.props.users} updateUser={this.props.updateUser} />
        <p>Topics:</p>
        {this.state.topics.map(({ slug }) => {
          return <Button key={slug}> <Link className='topics' to={`/articles/${slug}`}>#{slug}</Link> </Button>
        })}
      </nav>
    );
  }
}

export default NavBar;