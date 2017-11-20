import Graph from 'react-graph-vis';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import React from 'react';

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
    color: '#000000'
  }
};

// const events = {
//   select: function (event) {
//     var { nodes, edges } = event;
//     console.log("Selected nodes:");
//     console.log(nodes);
//     console.log("Selected edges:");
//     console.log(edges);
//   }
// };

class TestGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: []
    };
    this.events.select = this.events.select.bind(this);
  }

  componentDidMount() {
    this.props.fetchHistory();
  }

  events = {
    select: function(event) {
      var { nodes, edges } = event;
      this.setState({ nodes: nodes, edges: edges });
    }
  };

  render() {
    //   console.log(this.props.repo);
    console.log('nodes', this.state.nodes);
    console.log('edges', this.state.edges);
    // if(this.state.nodes[0])
    // console.log('try',  (this.props.repo.nodes.filter(node => (node.id == this.state.nodes[0])) )[0]['id']);

    const ele = this.state.nodes[0]
      ? this.props.repo.nodes.filter(node => node.id == this.state.nodes[0])[0]
      : null;

    return (
      <div>
        <h1>React graph vis</h1>

        <div>
          {/* {this.state.nodes &&  <p> Node info: {    (this.state.nodes[0])  && ( this.props.repo.nodes.filter(node => (node.id == this.state.nodes[0])) )[0]['id']  }</p>}   */}

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

const mapState = ({ repo }) => ({ repo });
const mapDispatch = dispatch => {
  return {
    fetchHistory: () => dispatch(fetchHistory())
  };
};

export default connect(mapState, mapDispatch)(TestGraph);
