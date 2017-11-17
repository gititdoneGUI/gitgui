import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import TestGraph from './Test';

class Data extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.fetchHistory();
  }

  render() {

    return (
      <div>

        <TestGraph />


      </div>
    );
  }
}

const mapState = ({ repo, user }) => ({ repo, user });
const mapDispatch = { fetchHistory };

export default connect(mapState, mapDispatch)(Data);
