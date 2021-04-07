import moment from 'moment';
import { Component } from 'react';
import { fetchComments } from '../api';

class Comments extends Component {
  state = {
    comments: [],
  };

  componentDidUpdate() {
    const { article_id } = this.props;
    fetchComments(article_id).then((comments) => {
      this.setState({ comments })
    })
  };

  render() {
    const { comments } = this.state;
    return (
      <main className="comments">
        {comments.map(({ comment_id, author, votes, created_at, body }) => {
          return (
            <section key={comment_id}>
              <p className="comment-author">{author}</p>
              <p className="comment-date">{moment(created_at).utcOffset(0).format("LLLL")}</p>
              <div className="comment-content">
                <p>{body}</p>
                <p>votes {votes}</p>
              </div>  
            </section>
          )
        })
        }
      </main> 
    )
  }
};

export default Comments;