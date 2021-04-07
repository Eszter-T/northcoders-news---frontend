import { Component } from 'react';
import { fetchArticle } from '../api';

class ArticlesCard extends Component {
  state = {
    article: {},
  };

  componentDidMount() {
    const { article_id } = this.props;
    fetchArticle(article_id).then((article) => {
      console.log(article)
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
      comment_count
    } = article;

    return (
      <main className="articles-card">
        <h2>{title}</h2>
        <h4>by {author}</h4>
        <h3>{body}</h3>
        <h4>votes {votes} | comments {comment_count}</h4>
      </main>
    )
  };
};

export default ArticlesCard;