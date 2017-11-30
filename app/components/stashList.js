import React, { Component } from 'react';
import { connect } from 'react-redux';


class StashList extends Component{
  constructor() {
    super();
    this.state = {
      dropdown: false
    };
  }

  render() {
    return (
      <div>
        { (this.props.stashmessage.length !== 0) ?
          (
            <div className='repo-info'>
              <button id='files-changed-button' onClick={() => this.setState((prevState) => {
                return {...prevState, dropdown: !prevState.dropdown};

              })}>
                <h5>Stashes: {this.props.stashmessage.length} ⌵</h5>
              </button>

              {
                this.state.dropdown ? (<ul className="repo-status">
                  {this.props.stashmessage.map((message, index)  => <li key={index}>{message}</li>)}
                </ul>) : ''

              }

            </div>) : (
            <div className='repo-info'>
              <h5> No Stashes</h5>

            </div>
          ) 
        }
      </div>
    );
  }
}

const mapState = ({stashmessage}) => ({ stashmessage });

export default connect(mapState, null)(StashList);
