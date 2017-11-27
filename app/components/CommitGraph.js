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
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'DU',        // UD, DU, LR, RL
      sortMethod: 'directed'   // hubsize, directed
    }
  },
  height: '1000px',
  width: '100%',
  edges: {
    color: '#000000'
  },
  nodes: {
    shape: 'dot'
  }
  // autoResize: true,
  // height: '100%',
  // width: '100%'
};

const mapState = ({ repo, status, commit, userPath }) => ({ repo, status, commit, userPath });
const mapDispatch = (dispatch) => {
  return {
    fetchHistory: () =>
      dispatch(fetchHistory()),
    statusCheck: (rootDir) =>
      dispatch(statusCheck(rootDir))
  //   commitTest: (commitMessage, userPath) =>
  //     dispatch(commitTest(commitMessage, userPath))
  // };
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
    // this.handleClick = this.handleClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchHistory();
    console.log(this.props.userPath);
    const watcher = chokidar.watch('.git/FETCH_HEAD', {
      // ignored: /(^|[\/\\])\../,
      persistent: true
    });

    // Something to use when events are received.
    const log = console.log.bind(console);
    // Add event listeners.
    watcher
      .on('add', path => log(`File ${path} has been added`))
      .on('change', path => {log(`File ${path} has been changed`);this.props.statusCheck();});
      // .on('unlink', path => log(`File ${path} has been removed`));
  }

  events = {
    select: function(event) {
      var { nodes, edges } = event;
      this.setState({ nodes: nodes, edges: edges });
    }
  };

  handleClick(event) {
    event.preventDefault();
    console.log(this.state.commitMessage, this.props.userPath);
    this.props.commitTest(this.state.commitMessage, this.props.userPath);
  }

  // handleChange(event){
  //   this.setState({commitMessage: event.target.value});
  // }

  render() {
    const ele = this.state.nodes[0]
      ? this.props.repo.nodes.filter(node => node.id == this.state.nodes[0])[0]
      : null;


    return (
      <div className="pane">
        {
          ele &&
            <ul>
              <li>Info:</li>
              <li> commit sha: { ele.id}</li>
              <li> commit message: {ele.label}</li>
              <li> time of commit: {ele.title.toString()}</li>
            </ul>
        }
        <Graph
          graph={this.props.repo}
          options={options}
          events={this.events}
          style={{height: '100%'}}
        />
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(CommitGraph);
