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

const mapState = ({ repo, status, commit }) => ({ repo, status, commit });
const mapDispatch = (dispatch) => {
  return { 
    fetchHistory: () =>
      dispatch(fetchHistory()),
    statusCheck: () => 
      dispatch(statusCheck()),
    commitTest: (commitMessage) => 
      dispatch(commitTest(commitMessage)) 
  };
};

class CommitGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: []
    };
    this.events.select = this.events.select.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {commitMessage: ''};
  }

  componentDidMount() {
    this.props.fetchHistory(this.props.root);
  }

  // componentDidMount(){
  //   this.props.statusCheck();
  //   this.props.fetchHistory();         
  // } //fetchHistory deal?

  events = {
    select: function(event) {
      var { nodes, edges } = event;
      this.setState({ nodes: nodes, edges: edges });
    }
  };

  handleClick() {
    if (this.props.status) {
      console.log(this.state.commitMessage);
      this.props.commitTest(this.state.commitMessage);
    } 
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
        <h1>React graph vis</h1>

        <div>
          {/* {this.state.nodes &&  <p> Node info: {    (this.state.nodes[0])  && ( this.props.repo.nodes.filter(node => (node.id == this.state.nodes[0])) )[0]['id']  }</p>}   */}
          <button type="button" disabled={this.props.status.length === 0} onClick ={this.handleClick} >Commit</button>
      {(this.props.status.length !== 0) && <form> 
        <input value={this.state.commitMessage} onChange={this.handleChange} />
      </form>}
          <div>
            <p>Node Info</p>
            { ele &&
            <ul>
              <li> sha: { ele.id}</li>
              <li> message: {ele.label}</li>
               <li> DateTime: {ele.title.toString()}</li>
            </ul>
            }
          </div>
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
