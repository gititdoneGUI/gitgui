import Graph from 'react-graph-vis';
import { connect } from 'react-redux';
import React from 'react';
import { statusCheck } from '../reducers/status';
import chokidar from 'chokidar';

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 150,
      nodeSpacing: 200,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'DU',
      sortMethod: 'directed'
    }
  },
  height: '100%',
  width: '100%',
  edges: {
    color: '#000000',
    width: 5,
    selectionWidth: function (width) {return width*2;}
  },
  nodes: {
    shape: 'dot',
  },
  physics: {
    enabled: false
  },
  autoResize: true
};

const mapState = ({ repo, status, commit, userPath, currentBranch, localBranch, remoteBranch}) => ({ repo, status, commit, userPath, currentBranch, localBranch, remoteBranch });
const mapDispatch = (dispatch) => {
  return {
    statusCheck: (rootDir) =>
      dispatch(statusCheck(rootDir))
  };
};

class CommitGraph extends React.Component {
  constructor(props) {
    super(props);
    this.events.select = this.events.select.bind(this);
  }

  componentDidMount() {
    this.props.statusCheck(this.props.userPath);
    this.watcher = chokidar.watch(this.props.userPath, {
      persistent: true
    });

    // Add event listeners.
    this.watcher
      .on('add', this.check)
      .on('change', this.check)
      .on('ready', () => this.timeout = 500);
  }

  timeout = 10000

  check = () => {
    this.pendingCheck = this.pendingCheck || setTimeout(() => {
      this.pendingCheck = null;
      this.props.statusCheck(this.props.userPath);
    }, this.timeout);
  }

  componentWillUnmount(){
    this.watcher.close();
  }

  events = {
    select: function(event) {
      this.props.handleNodeClick(event);
    }
  };

  handleClick(event) {
    event.preventDefault();
    this.props.commitTest(this.state.commitMessage, this.props.userPath);
  }

  render() {
    const colors = [ '#80b3ff', '#85e085', '#ff80b3', '#aa80ff', '#ff8c1a', '#ffdb4d'];
    const renderoptions = Object.assign({}, options, {nodes: {
      shape: 'dot',
      color: colors[this.props.localBranch.indexOf(this.props.currentBranch) % colors.length]
    }});
    return (
      <div className="pane">
        <Graph
          graph={this.props.repo}
          options={renderoptions}
          events={this.events}
        />
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(CommitGraph);
