import React from 'react';

const Title = (props) => {
  return (
    <header>
      <h1>NC News</h1>
      <p>What are Northcoders talking about?</p>
      <p>Logged in as: {props.user}</p>
    </header>
  );
};

export default Title;