import { Component } from 'react';
import { fetchArticle } from '../api';
import Comments from './Comments';

class ArticlesCard extends Component {
  state = {
    article: {},
  };

  componentDidMount() {
    const { article_id } = this.props;
    fetchArticle(article_id).then((article) => {
      this.setState({ article });
    });
  };
  
  changeVotes = (increment) => {
    this.setState((currentState) => {
      const newState = { ...currentState };
      newState.article.votes = currentState.article.votes + increment;
      return newState;
    });
  };

  render() {
    const { article } = this.state;
    const {
      title,
      author,
      body,
      votes,
      comment_count,
      article_id
    } = article;
    
    return (
      <main className="articles-card">
        <h2>{title}</h2>
        <h4>by {author}</h4>
        <p>{body}</p>
        <div className="article-votes">
          <button onClick={() => this.changeVotes(1)}>^</button>
          <p>votes {votes}</p>
          <button onClick={() => this.changeVotes(-1)}>v</button>
        </div>
        <p>comments {comment_count}</p>
        <Comments article_id={article_id}/>
      </main>
    )
  };
};

export default ArticlesCard;