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
    const { updateUser, users } = this.props;
    return (
      <nav className='navbar' >
        <div className='home'>
          <Link to='/'>
            <Button>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Simpleicons_Places_home-front.svg/1024px-Simpleicons_Places_home-front.svg.png" height='40' width='40' alt="home icon" />
            </Button>
          </Link>
        </div>
        <h2 className='login-as'>Login as: </h2>
        <div className='login-select'>
          <Login users={users} updateUser={updateUser} />
        </div>
        {this.state.topics.map(({ slug }) => {
          return <Link key={slug} to={`/articles/${slug}`}><Button className='topics'> #{slug} </Button></Link>
        })
        }
      </nav >
    );
  }
}

export default NavBar;