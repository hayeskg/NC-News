import React from 'react';
import Select from '../styled-components/Select'

const Login = (props) => {
  return (
    <>
      <p>Login as: </p>
      <Select onChange={(e) => { props.updateUser(e.target.value) }} name="users" id="users">
        {props.users.map((user, index) => {
          return <option key={index} value={user}>{user}</option>
        })}
      </Select>
    </>
  );
};

export default Login;