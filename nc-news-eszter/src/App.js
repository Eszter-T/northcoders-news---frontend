import { Router } from '@reach/router';
import React from 'react';
import './App.css';
import ArticlesList from './components/ArticlesList';
import NavBar from './components/NavBar';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <Title />
      <NavBar />
      <Router className="content">
        <ArticlesList path="/" />
        <ArticlesList path="/:topic/articles" />
      </Router>
    </div>
  );
}

export default App;
