import { Router } from '@reach/router';
import React from 'react';
import './App.css';
import ArticlesCard from './components/ArticlesCard';
import ArticlesList from './components/ArticlesList';
import ErrorPage from './components/ErrorPage';
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
        <ArticlesCard path="/articles/:article_id" />
        <ErrorPage default status={404} msg={"Path not found..."}/>
      </Router>
    </div>
  );
}

export default App;
