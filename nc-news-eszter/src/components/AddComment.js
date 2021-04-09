import { Component } from 'react';
import { postComment } from '../api';

class AddComment extends Component {
  state = {
    comment: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };
  
  handleSubmit = (event) =>  {
    event.preventDefault();
    const { comment } = this.state;
    const { article_id } = this.props;
    const commentToPost = {
      body: comment,
      username: 'jessjelly'
    };
    postComment(article_id, commentToPost)
    .then((newComment) => {
      this.setState({ comment: '' });
      this.props.addPostedComment(newComment);
    });
  };

  render() {
    const { comment } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label htmlFor="comment" id="label"></label>
        <textarea
          id="comment"
          name="comment"
          onChange={this.handleChange}
          value={comment}
          placeholder="Write a comment..."
        ></textarea>
        <button id="post-button">Post</button>
      </form>
    );
  };
};

export default AddComment;