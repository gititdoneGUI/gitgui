import Graph from "react-graph-vis";
import { connect } from 'react-redux';
import { fetchHistory } from '../reducers/repo';
import React from "react";
import { render } from "react-dom";

const graph = {
  nodes: [
    { id: 1, label: "Node 1", color: "#e04141" },
    { id: 2, label: "Node 2", color: "#e09c41" },
    { id: 3, label: "Node 3", color: "#e0df41" },
    { id: 4, label: "Node 4", color: "#7be041" },
    { id: 5, label: "Node 5", color: "#41e0c9" }
  ],
  edges: [{ from: 1, to: 2 }, { from: 3, to: 1 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
};

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

const mapState = ({ repo }) => ({ repo });
const mapDispatch = ({ fetchHistory });

class TestGraph extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchHistory();
  }

  render() {
      console.log(this.props.repo);
    return (
      <div>
        <h1>React graph vis</h1>
        <p>
          <a href="https://github.com/crubier/react-graph-vis">Github</a> -{" "}
          <a href="https://www.npmjs.com/package/react-graph-vis">NPM</a>
        </p>
        <p>
          <a href="https://github.com/crubier/react-graph-vis/tree/master/example">Source of this page</a>
        </p>
        <p>A React component to display beautiful network graphs using vis.js</p>
        <p>
                    Make sure to visit <a href="http://visjs.org">visjs.org</a> for more info.
        </p>
        <p>This package allows to render network graphs using vis.js.</p>
        <p>Rendered graphs are scrollable, zoomable, retina ready, dynamic, and switch layout on double click.</p>

        <Graph graph={this.props.repo} options={options} events={events} style={{ height: "640px" }} />
      </div>
    );

  }
}

export default connect(mapState, mapDispatch)(TestGraph);

