import React, {Component} from 'react';

import RoomConfirmWindow from '../calendarView/roomConfirmWindow/RoomConfirmWindow'

import {getAllRooms} from "../calendarView/calendarQueryService/RoomsQueryService";

import './roomView.css'
import RoomRect from "./roomRect/RoomRect";

class RoomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomConfirmWindow: false,
      selectedRoom: -1,
    };
  }

  componentDidMount() {
    getAllRooms((data) => {
      this.setState({rooms: data})
    });
  }

  openRoomConfirmWindow(roomId) {
    this.setState(
      {
        roomConfirmWindow: true,
        selectedRoom: roomId
      }
    );
  }

  closeRoomConfirmWindow() {
    this.setState({roomConfirmWindow: false});
  }

  render() {
    return (
      <div className="roomView">
        {this.state.rooms.map((x, i) =>
          <RoomRect key={i} room={x}/>
        )}
        {this.state.roomConfirmWindow ? <RoomConfirmWindow roomId={this.state.selectedRoom.aggregateId}/> : null}
      </div>
    );
  }
}

export default RoomView;