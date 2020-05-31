import React from 'react';

const Title = (props) => {
  return (
    <header className={'title'}>
      <h1>NC News</h1>
      <p>What are Northcoders talking about?</p>
      <p>Hi, {props.user}! </p>
    </header>
  );
};

export default Title;