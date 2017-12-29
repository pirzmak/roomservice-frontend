import React, {Component} from 'react';

import Room from '../room/Room'

import './rooms.css'

class Rooms extends Component {
  render() {
    return (
      <div className="rooms">
        {this.props.rooms.map((x, i) =>
          <Room key={i} room={x} handleClick={this.props.openRoomConfrmWindow}/>
        )}
      </div>
    );
  }
}

export default Rooms;