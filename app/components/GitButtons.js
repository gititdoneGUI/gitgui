import React, { Component } from 'react';
import Commit from './Commit';
import AddBranch from './AddBranch';
import DeleteBranch from './DeleteBranch';
import Clone from './Clone';
import Fetch from './Fetch';
import Merge from './Merge';
import Pull from './Pull';
import Push from './Push';
import Stash from './Stash';
import Checkout from './Checkout';


export default class GitButtons extends Component{
  constructor(){
    super();
    this.state = {
      commitMessage: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log(this.state.commitMessage);
    this.props.commit(this.state.commitMessage, this.props.userPath);
  }

  handleChange(event) {
    this.setState({ commitMessage: event.target.value });
  }

  render(){
    return(
      <div className="git-methods">
        <Commit />
        <Pull />
        <Push />
        <Fetch />
        <br />
        <Checkout />
        <br />
        <AddBranch />
        <br />
        <DeleteBranch />
        <br />
        <Merge />
        <Stash />
        <Clone />
        {/* <Branch /> */}
      </div>
    );
  }
}

// export default connect(null)(GitButtons);

