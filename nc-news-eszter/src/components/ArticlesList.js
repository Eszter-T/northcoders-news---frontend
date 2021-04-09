import { Link } from '@reach/router';
import moment from 'moment';
import { Component } from 'react';
import { fetchArticles } from '../api';
import Voter from './Voter';

class ArticlesList extends Component {
  state = {
    articles: [],
    p: 1,
    total_count: 0,
    sort_by: 'created_at',
    err: null
  };
  
  componentDidMount() {
    const { topic } = this.props;
    this.getArticles(topic);
    const storedSortBy = localStorage.getItem('sort_by');
    if (storedSortBy) {
      this.setState({ sort_by: storedSortBy });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { p, sort_by } = this.state;
    if (topic !== prevProps.topic || p !== prevState.p || sort_by !== prevState.sort_by) {
      this.getArticles(topic);   
    };
  };

  getArticles = (topic) => {
    const { p, sort_by } = this.state;
    fetchArticles(topic, p, sort_by).then(({ articles, total_count }) => {
       
        this.setState({ articles, total_count});
      });
  };
  
  setSortedBy = (newSortedBy) => {
    this.setState({ sort_by: newSortedBy });
    localStorage.setItem('sort_by', newSortedBy);
  };

  changePage = (increment) => {
    this.setState((currentState) => {
      return {
        p: currentState.p + increment,
      };
    });
  };

  render() {
    const { articles, p, total_count, sort_by } = this.state;
    const lastPageNumber = Math.ceil(total_count / 10);

    if (articles.length === 0) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <main className="articles-list">
        <section className="sort_by">
          <span>Sort by: {sort_by} </span>
          <button onClick={() => this.setSortedBy('created_at')}>Date</button>
          <button onClick={() => this.setSortedBy('votes')}>Votes</button>
          <button onClick={() => this.setSortedBy('comment_count')}>Comments</button>
        </section>
        {articles.map(({ article_id, title, author, topic, created_at, votes }) => {
          return (
            <section key={article_id}> 
              <div className="articles-content">
                <Link to={`/articles/${article_id}`}>
                  <h2>{title}</h2>
                </Link>  
                <h3> by {author}</h3>
              </div>
              <Voter type="articles" id={article_id} votes={votes} />
              <span className="articles-topic">{topic}</span>
              <span className="articles-date">{moment(created_at).utcOffset(60).format("LLLL")}</span>
            </section>
          )
        })
        }
        <section className="change-page">
          <button disabled={p === 1} onClick={() => this.changePage(-1)}>{"<"}</button>
          <span>{p}</span>
          <button disabled={p >= lastPageNumber} onClick={() => this.changePage(1)}>{">"}</button>
        </section>
      </main>
    );
  };
};

export default ArticlesList;