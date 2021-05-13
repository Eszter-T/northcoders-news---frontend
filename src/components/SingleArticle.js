import { Component } from 'react';
import { fetchArticle, fetchComments } from '../api';
import AddComment from './AddComment';
import Comments from './Comments';
import ErrorPage from './ErrorPage';
import Voter from './Voter';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: [],
    sort_by: 'created_at',
    err: null
  };

  componentDidMount() {
    const inheritedVotingSort = ["created_at", "votes"].includes(this.state.sort_by) 
      ? this.state.sort_by
      : "created_at";

    Promise.all([
      fetchArticle(this.props.article_id),
      fetchComments(this.props.article_id, inheritedVotingSort)
    ])
    .then(([article, comments]) => {
      this.setState({ article, comments });
      const storedSortBy = localStorage.getItem('sort_by');
      if (storedSortBy) {
        this.setState({ sort_by: storedSortBy })
      }
    })
    .catch((err) => {
      this.setState({ err: err });
    })
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by } = this.state;
    if (sort_by !== prevState.sort_by) {
      this.componentDidMount();
    }
  };

  setSortedBy = (newSortedBy) => {
    this.setState({ sort_by: newSortedBy });
    localStorage.setItem('sort_by', newSortedBy);
  };
  
  addPostedComment = (newComment) => {
    this.componentDidMount();
  };

  refreshComments = () => {
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
        <AddComment article_id={article_id} addPostedComment={this.addPostedComment} />
        <section className="comments-sort_by">
          <div id="sort_by">
            <span>Sort by: </span>
            <button onClick={() => this.setSortedBy('created_at')}>Date</button>
            <button onClick={() => this.setSortedBy('votes')}>Votes</button>
          </div>
          <div id="comment_count">{comment_count} comments</div>
        </section>
        <Comments article_id={article_id} comments={comments} onDelete={this.refreshComments} />
      </main>
    )
  };
};

export default SingleArticle;