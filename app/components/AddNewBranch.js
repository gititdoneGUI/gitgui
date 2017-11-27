import Graph from 'react-graph-vis';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import React from 'react';
import { commitTest } from '../reducers/commit';
import { statusCheck } from '../reducers/status';
import {checkout, checkoutBranch, checkoutLocalBranch, deleteLocalBranch} from '../reducers/branches';

//this is a test component!!

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: '#000000'
  }
};

const mapState = ({ repo, status, commit, userPath, branch }) => ({ repo, status, commit, userPath, branch});
const mapDispatch = (dispatch) => {
  return {
    fetchHistory: () =>
      dispatch(fetchHistory()),
    statusCheck: (rootDir) =>
      dispatch(statusCheck(rootDir)),
    commitTest: (commitMessage, userPath) =>
      dispatch(commitTest(commitMessage, userPath)),
    checkoutBranch: (path, branchName, startPoint) => 
      dispatch(checkoutBranch(path, branchName, startPoint)),
    checkoutLocalBranch: (path, branchName) =>
      dispatch(checkoutLocalBranch(path, branchName)),
    deleteLocalBranch: (path, branchName) =>
      dispatch(deleteLocalBranch(path, branchName))
  };
};

class NewBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: [],
      commitMessage: ''
    };
    this.events.select = this.events.select.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT', this.props.userPath);
    this.props.fetchHistory(this.props.userPath);
    this.props.statusCheck(this.props.userPath);
  }

  events = {
    select: function(event) {
      var { nodes, edges } = event;
      this.setState({ nodes: nodes, edges: edges });
    }
  };

  handleClick(event) {
    event.preventDefault();
    console.log(this.state.commitMessage);
    this.props.commitTest(this.state.commitMessage, this.props.userPath);
  }

  handleChange(event){
    this.setState({commitMessage: event.target.value});
  }

  render() {
    return (
      <div>
          <button> Checkout </button>
          <button type='submit'> Branch </button>

        <Graph
          graph={this.props.repo}
          options={options}
          events={this.events}
          style={{ height: '640px' }}
        />
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(NewBranch);
