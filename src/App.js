import React, { Component } from 'react';
import './App.css';
import Title from './components/site-components/Title';
import NavBar from './components/navigation-components/NavBar';
import { Router } from '@reach/router'
import ArticleList from './components/article-components/ArticleList';
import Article from './components/article-components/Article'
import ErrorDisplayer from './components/error-components/ErrorDisplayer';
import Footer from "./components/site-components/Footer";

import styled from 'styled-components'

const Outer = styled.div`
  text-align: center;
`

class App extends Component {

  state = {
    currentUser: 'weegembump',
    users: ['weegembump', 'happyamy2016', 'tickle122']
  }

  updateUser = (user) => {
    this.setState({ currentUser: user })
  }



  render() {
    const { currentUser, users } = this.state
    return (
      <Outer>
        <Title user={currentUser} />
        <NavBar user={currentUser} users={users} updateUser={this.updateUser} />
        <Router>
          <ArticleList path='/' />
          <ArticleList path='/articles' />
          <ArticleList path='/articles/:topic' />
          <Article path='/article/:article_id' user={currentUser} />
          <ErrorDisplayer default />
        </Router>
        <Footer />
      </Outer>
    );
  }
}

export default App;