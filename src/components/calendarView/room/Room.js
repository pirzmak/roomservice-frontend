import React, {Component} from 'react';

import './room.css'

class Room extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="roomOuter">
        <div className="roomInner">
          {this.props.id}
        </div>
      </div>
    );
  }
}

export default Room;