import Graph from 'react-graph-vis';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import React from 'react';
// import { commitTest } from '../reducers/commit';
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
      direction: 'DU',        // UD, DU, LR, RL
      sortMethod: 'directed'   // hubsize, directed
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
    shape: 'dot'
  },
  physics: {
    enabled: false
  },
  autoResize: true
};


const mapState = ({ repo, status, commit, userPath }) => ({ repo, status, commit, userPath });
const mapDispatch = (dispatch) => {
  return {
    // fetchHistory: () =>
    //   dispatch(fetchHistory()),
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
    // this.props.fetchHistory();
    // this.props.statusCheck();
    console.log(this.props.userPath);
    this.watcher = chokidar.watch(this.props.userPath, {
      // ignored: /(^|[\/\\])\../,
      persistent: true
    });

    // Something to use when events are received.
    const log = console.log.bind(console);
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
      this.props.statusCheck();
    }, this.timeout);
  }

  componentWillUnmount(){
    this.watcher.close();
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps.userPath);
  //   return this.props.userPath !== nextProps.userPath;
  // }

  events = {
    select: function(event) {
      this.props.handleNodeClick(event);
    }
  };

  handleClick(event) {
    event.preventDefault();
    console.log(this.state.commitMessage, this.props.userPath);
    this.props.commitTest(this.state.commitMessage, this.props.userPath);
  }

  render() {
    return (
      <div className="pane">
        <Graph
          graph={this.props.repo}
          options={options}
          events={this.events}
        />
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(CommitGraph);
