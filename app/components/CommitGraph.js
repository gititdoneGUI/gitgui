import Graph from 'react-graph-vis';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import React from 'react';
import { commitTest } from '../reducers/commit';
import { statusCheck } from '../reducers/status';

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: '#000000'
  }
};

const mapState = ({ repo, status, commit, userPath }) => ({ repo, status, commit, userPath });
const mapDispatch = (dispatch) => {
  return {
    fetchHistory: () =>
      dispatch(fetchHistory()),
    statusCheck: (rootDir) =>
      dispatch(statusCheck(rootDir)),
    commitTest: (commitMessage, userPath) =>
      dispatch(commitTest(commitMessage, userPath))
  };
};

class CommitGraph extends React.Component {
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
    const ele = this.state.nodes[0]
      ? this.props.repo.nodes.filter(node => node.id == this.state.nodes[0])[0]
      : null;

    return (
      <div>
        <div>
          {
            (this.props.status.length !== 0) && <form onSubmit={this.handleClick}>
              <input value={this.state.commitMessage} onChange={this.handleChange} ></input>
              <button type="submit">
                  Commit
              </button>
            </form>
          }
          { ele &&
            <ul>
              <li>Info:</li>
              <li> commit sha: { ele.id}</li>
              <li> commit message: {ele.label}</li>
              <li> time of commit: {ele.title.toString()}</li>
            </ul>
          }
        </div>
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

export default connect(mapState, mapDispatch)(CommitGraph);
