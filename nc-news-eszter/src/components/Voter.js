import React, { Component } from 'react';
import { changeVotes } from '../api';

class Voter extends Component {
  state = {
    voteChanges: 0,
  };
  
  updateVotes = (id, increment) => {
    this.setState((currentState) => {
      const { voteChanges } = this.state;
      if (voteChanges < 1 && voteChanges > -1) {
      return {
        voteChanges: currentState.voteChanges + increment,
      };
      }
    });
    changeVotes(this.props.type, id, increment);
  };

  render() {
    const { votes, id } = this.props;
    const { voteChanges } = this.state;
    return (
      <section className="votes">
        <div onClick={() => this.updateVotes(id, 1)}></div>
        <p>{votes + voteChanges} votes</p>
        <div onClick={() => this.updateVotes(id, -1)}></div>
      </section>
      
    )
  };
};

export default Voter;