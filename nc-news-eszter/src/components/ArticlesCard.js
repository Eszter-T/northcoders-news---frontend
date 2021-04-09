import { Component } from 'react';
import { fetchArticle, fetchComments } from '../api';
import AddComment from './AddComment';
import Comments from './Comments';
import ErrorPage from './ErrorPage';
import Voter from './Voter';

class ArticlesCard extends Component {
  state = {
    article: {},
    comments: [],
    err: null
  };

  componentDidMount() {
    console.log("Mounted")
    Promise.all([
      fetchArticle(this.props.article_id),
      fetchComments(this.props.article_id)
    ])
    .then(([article, comments]) => {
      this.setState({ article, comments })
    })
    .catch((err) => {
      this.setState({ err: err })
    })
  };
  
  addPostedComment = (newComment) => {
    this.componentDidMount();
  };

  render() {
    const { article, comments, err } = this.state;
    const {
      title,
      author,
      body,
      votes,
      comment_count,
      article_id
    } = article;
    
    if (err) {
      return (
        <ErrorPage status={err.response.status} msg={err.response.data.msg} />
      )
    }

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
        <p>{comment_count} comments</p>
        <AddComment article_id={article_id} addPostedComment={this.addPostedComment} />
        <Comments article_id={article_id} comments={comments} />
      </main>
    )
  };
};

export default ArticlesCard;