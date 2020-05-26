import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <NavBar />
      </div>
    );
  }
}

export default App;