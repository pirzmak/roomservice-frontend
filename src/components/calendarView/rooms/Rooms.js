import React, {Component} from 'react';

import Room from '../room/Room'

import './rooms.css'

import {changeRoomInfo,changeBedsNr,changeRoomCost,deleteRoom,activeRoom} from "../calendarCommandService/RoomsCommandService";

class Rooms extends Component {
  constructor(props) {
    super(props);
  }

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