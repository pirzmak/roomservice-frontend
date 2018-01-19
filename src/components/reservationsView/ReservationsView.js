import React, {Component} from 'react';

import RoomConfirmWindow from '../calendarView/roomConfirmWindow/RoomConfirmWindow'

import {getAllReservations} from "../../services/queryServices/ReservationsQueryService";

import './reservationsView.css'
import ReservationRect from "./reservationRect/ReservationRect";
import ReservationConfirmWindow from "./reservationConfirmWindow/ReservationConfirmWindow";

class ReservationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      reservationConfirmWindow: false,
      selectedReservation: -1,
      newReservation: false
    };

    this.openReservationConfirmWindow = this.openReservationConfirmWindow.bind(this);
    this.closeReservationConfirmWindow = this.closeReservationConfirmWindow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addNewRoom = this.addNewRoom.bind(this);
  }

  componentDidMount() {
    getAllReservations((data) => {
      this.setState({reservations: data})
    });
  }

  openReservationConfirmWindow(roomId) {
    this.setState(
      {
        reservationConfirmWindow: true,
        newReservation: false,
        selectedReservation: roomId
      }
    );
  }

  closeReservationConfirmWindow() {
    this.setState({reservationConfirmWindow: false, newReservation: false,});
  }

  addNewRoom(room) {
    this.state.rooms.push(room);
    this.setState({reservationConfirmWindow: false, newReservation: false,});
  }

  onChange(room) {
    this.setState({rooms: this.state.rooms.map(r => r.aggregateId.id === room.aggregateId.id ? room : r), roomConfirmWindow: false})
  }

  render() {
    return (
      <div>
        <div className={"reservationView"}>
          {this.state.reservations.map((x, i) =>
            <ReservationRect key={i} reservation={x} handleClick={this.openReservationConfirmWindow} onChange={this.onChange}/>
          )}
        </div>
        {this.state.reservations[0] ? <ReservationConfirmWindow reservationId={this.state.reservations[0].aggregateId}/> : ""}
      </div>
    );
  }
}

export default ReservationView;