import Graph from "react-graph-vis";
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import { statusCheck } from '../reducers/status';
import { commitTest } from '../reducers/commit';


import React from "react";

// const graph = {
//   nodes: [
//     { id: 1, label: "Node 1", color: "#e04141" },
//     { id: 2, label: "Node 2", color: "#e09c41" },
//     { id: 3, label: "Node 3", color: "#e0df41" },
//     { id: 4, label: "Node 4", color: "#7be041" },
//     { id: 5, label: "Node 5", color: "#41e0c9" }
//   ],
//   edges: [{ from: 1, to: 2 }, { from: 3, to: 1 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
// };

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000"
  }
};

const events = {
  select: function (event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
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

class TestGraph extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {commitMessage: ''};
  }

  componentDidMount(){
    this.props.statusCheck();
    this.props.fetchHistory();         
    
  }

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
    return (
      <div>
        <h1>React graph vis</h1>
        <button type="button" disabled={this.props.status.length === 0} onClick ={this.handleClick} >Commit</button>
        {(this.props.status.length !== 0) && <form> 
          <input value={this.state.commitMessage} onChange={this.handleChange} />
        </form>}
        <Graph graph={this.props.repo} options={options} events={events} style={{ height: "640px" }} />
      </div>
    );

  }
}

export default connect(mapState, mapDispatch)(TestGraph);

