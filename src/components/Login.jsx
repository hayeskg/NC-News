import React from 'react';

const Login = (props) => {
  console.log(props)
  return (
    <>
      <p>Login as: </p>
      <select onChange={() => { props.updateUser('user will go here...') }} name="users" id="users">
        {props.users.map((user, index) => {
          return <option key={index} value={user}>{user}</option>
        })}
      </select>
    </>
  );
};

export default Login;