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
  };
  
  componentDidMount() {
    const { topic } = this.props;
    this.getArticles(topic);
  };

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { p } = this.state;
    if (topic !== prevProps.topic || p !== prevState.p) {
      this.getArticles(topic);   
    };
  };

  getArticles = (topic) => {
    const { p } = this.state;
    fetchArticles(topic, p).then(({ articles, total_count }) => {
       
        this.setState({ articles, total_count});
      });
  };

  changePage = (increment) => {
    this.setState((currentState) => {
      return {
        p: currentState.p + increment,
      };
    });
  };

  render() {
    const { articles, p, total_count } = this.state;
    const lastPageNumber = Math.ceil(total_count / 10);

    if (articles.length === 0) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <main className="articles-list">
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
              <span className="articles-date">{moment(created_at).utcOffset(0).format("LLLL")}</span>
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