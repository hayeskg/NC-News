import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import NavBar from './components/NavBar';
import { Router } from '@reach/router'
import ArticleList from './components/ArticleList';
import Article from './components/Article'
import ErrorDisplayer from './components/ErrorDisplayer';
import Footer from "./components/Footer";

class App extends Component {

  state = {
    currentUser: 'weegembump',
    users: ['demo', 'admin', 'recruiter']
  }

  updateUser = (user) => {
    //this.setState({ currentUser: user })
    console.log(user)
  }

  render() {
    const { currentUser, users } = this.state
    return (
      <div>
        <Title user={currentUser} />
        <NavBar users={users} updateUser={this.updateUser} />
        <Router>
          <ArticleList path='/' />
          <ArticleList path='/articles' />
          <ArticleList path='/articles/:topic' />
          <Article path='/article/:article_id' user={currentUser} />
          <ErrorDisplayer default />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;