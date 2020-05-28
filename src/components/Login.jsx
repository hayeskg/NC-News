import React from 'react';

const Login = (props) => {
  return (
    <>
      <p>Login as: </p>
      <select onChange={(e) => { props.updateUser(e.target.value) }} name="users" id="users">
        {props.users.map((user, index) => {
          return <option key={index} value={user}>{user}</option>
        })}
      </select>
    </>
  );
};

export default Login;