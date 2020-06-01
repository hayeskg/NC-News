import React from 'react';
import { Link } from '@reach/router';
import Login from './Login';
import Button from '../styled-components/Button';


const NavBar = (props) => {
  const { updateUser, users, user } = props;
  return (
    <>
      <nav className='navbar'>
        <div className='home'>
          <h2>Home</h2>
          <Link to='/'>
            <Button>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Simpleicons_Places_home-front.svg/1024px-Simpleicons_Places_home-front.svg.png" height='40' width='40' alt="home icon" />
            </Button>
          </Link>
        </div>
        <div className='login'>
          <h2>Login</h2>
          <Login users={users} updateUser={updateUser} />
          <p>Hi, {user}! </p>
        </div>
      </nav >

    </>

  );
}


export default NavBar;