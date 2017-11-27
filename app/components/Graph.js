import Graph from 'react-graph-vis';
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import React from 'react';

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: '#000000'
  }
};

class CommitGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: []
    };
    this.events.select = this.events.select.bind(this);
  }

  componentDidMount() {
    this.props.fetchHistory(this.props.root);
  }

  events = {
    select: function(event) {
      var { nodes, edges } = event;
      this.setState({ nodes: nodes, edges: edges });
    }
  };

  render() {
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
const mapDispatch = {fetchHistory};

export default connect(mapState, mapDispatch)(CommitGraph);
