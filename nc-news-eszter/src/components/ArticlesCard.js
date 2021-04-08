import { Component } from 'react';
import { fetchArticle } from '../api';
import Comments from './Comments';
import Voter from './Voter';

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
    console.log(article_id)
    if (article_id === undefined) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <main className="articles-card">
        <div className="articles-header">
          <h2 className="articles-title">{title}</h2>
          <h4 className="articles-title">by {author}</h4>
          <Voter type="articles" id={article_id} votes={votes}/>
        </div>
        <p>{body}</p>
        <p>comments {comment_count}</p>
        <Comments article_id={article_id}/>
      </main>
    )
  };
};

export default ArticlesCard;