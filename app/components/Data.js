import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import Tree from 'react-d3-tree';

class Data extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.fetchHistory();
  }

  render() {
    console.log(this.props.repo);
    return (
      <div id="treeWrapper" style={{width: '5000em', height: '2000em'}}>

        <Tree orientation="vertical"
        data={[this.props.repo]} />


      </div>
    );
  }
}

const mapState = ({ repo, user }) => ({ repo, user });
const mapDispatch = { fetchHistory };

export default connect(mapState, mapDispatch)(Data);
