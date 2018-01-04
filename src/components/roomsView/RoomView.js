import React, {Component} from 'react';

import RoomConfirmWindow from '../calendarView/roomConfirmWindow/RoomConfirmWindow'

import {getAllRooms} from "../../services/queryServices/RoomsQueryService";

import './roomView.css'
import RoomRect from "./roomRect/RoomRect";

class RoomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomConfirmWindow: false,
      selectedRoom: -1,
      newRoom: false
    };

    this.openRoomConfirmWindow = this.openRoomConfirmWindow.bind(this);
    this.closeRoomConfirmWindow = this.closeRoomConfirmWindow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addNewRoom = this.addNewRoom.bind(this);
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
        newRoom: false,
        selectedRoom: roomId
      }
    );
  }

  closeRoomConfirmWindow() {
    this.setState({roomConfirmWindow: false, newRoom: false,});
  }

  addNewRoom(room) {
    this.state.rooms.push(room);
    this.setState({roomConfirmWindow: false, newRoom: false,});
  }

  onChange(room) {
    this.setState({rooms: this.state.rooms.map(r => r.aggregateId.id === room.aggregateId.id ? room : r), roomConfirmWindow: false})
  }

  render() {
    return (
      <div>
        <div className={"roomView"}>
          {this.state.rooms.map((x, i) =>
            <RoomRect key={i} room={x} handleClick={this.openRoomConfirmWindow} onChange={this.onChange}/>
          )}
          <button type="button" className={"btn btn-success btn-circle btn-lg newRoomButton" + (this.state.roomConfirmWindow ? " left" : "")}
                  onClick={() => this.setState({roomConfirmWindow: true, newRoom: true})}><i className="glyphicon glyphicon-plus"/></button>
        </div>
        {this.state.roomConfirmWindow ? <RoomConfirmWindow roomId={this.state.newRoom ? undefined : this.state.selectedRoom.aggregateId}
                                                           close={this.closeRoomConfirmWindow}
                                                           onChange={this.onChange}
                                                           newRoom={this.state.newRoom}
                                                           addNewRoom={this.addNewRoom}/> : null}
      </div>
    );
  }
}

export default RoomView;