import moment from 'moment';
import { Component } from 'react';
import DeleteComment from './DeleteComment';
import Voter from './Voter';

class Comments extends Component {
  state = {
    comments: [],
  };

  render() {
    const { comments } = this.props;
    
    return (
      <main className="comments">
        {comments.map(({ comment_id, author, votes, created_at, body }) => {
          return (
            <section key={comment_id}>
              <p className="comment-author">{author}</p>
              <p className="comment-date">{moment(created_at).utcOffset(60).format("LLLL")}</p>
              <p className="comment-content">
                {body}
                {
                  (author === "jessjelly") 
                    ? <DeleteComment comment_id={comment_id} author={author} onDelete={this.props.onDelete}/> 
                    : null
                }
              </p>
              <Voter type="comments" id={comment_id} votes={votes} />
            </section>
          )
        })
        }
      </main> 
    )
  }
};

export default Comments;