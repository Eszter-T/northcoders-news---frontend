import moment from 'moment';
import { Component } from 'react';
import { fetchComments } from '../api';
import Voter from './Voter';

class Comments extends Component {
  state = {
    comments: [],
  };

  componentDidMount(){
    const { article_id } = this.props;
    if(this.state.comments.length === 0 && article_id !== undefined) {
      fetchComments(article_id).then((comments) => {
        this.setState({ comments })
      })
    }
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
              <p className="comment-content">{body}</p>
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