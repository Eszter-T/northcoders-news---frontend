import { Component } from 'react';
import { deleteComment } from '../api';

class DeleteComment extends Component {
  
  handleClick = (event) => {
      event.preventDefault();
      const { comment_id, author,onDelete } = this.props;
      if (author === "jessjelly") {
        deleteComment(comment_id).then(() => onDelete());
      }
  }

  render() {
    return (
      <button id="delete-button" onClick={this.handleClick}>Delete</button>
    )
  }
};

export default DeleteComment;