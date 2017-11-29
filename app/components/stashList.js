import React, { Component } from 'react';
import { connect } from 'react-redux';


class StashList extends Component{
  render() {
    return (
      <div>
        <h4>Stashes</h4>

        <form>
          {this.props.stashmessage &&
          <select>
            <option></option>
            {
              this.props.stashmessage.map((message) => 
                <option key={message} value={message}>{message}</option>
              )
            }
          </select>
          }
        </form> 
      </div>
    );
  }
}

const mapState = ({stashmessage}) => ({ stashmessage });


export default connect(mapState, null)(StashList);
