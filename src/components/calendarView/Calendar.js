import React, {Component} from 'react';
import {now} from '../utils/index'

import CalendarGrid from './calendarGrid/CalendarGrid'
import Rooms from './rooms/Rooms'
import ReservationWindow from './reservationWindow/ReservationWindow'
import RoomConfirmWindow from './roomConfirmWindow/RoomConfirmWindow'

import {getAllRooms} from "../../services/queryServices/RoomsQueryService";
import {createNewReservation} from "../../services/queryServices/ReservationsQueryService"

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationWindow: false,
      clickedDate: now(),
      rooms: [],
      newReservations: [],
      roomConfirmWindow: false,
      selectedRoom: -1,
    };

    this.openReservationWindow = this.openReservationWindow.bind(this);
    this.closeReservationWindow = this.closeReservationWindow.bind(this);
    this.addNewReservation = this.addNewReservation.bind(this);
    this.addNewReservationConfirm = this.addNewReservationConfirm.bind(this);

    this.openRoomConfirmWindow = this.openRoomConfirmWindow.bind(this);
  }

  componentDidMount() {
    getAllRooms((data) => {
      this.setState({rooms: data})
    });
  }

  openReservationWindow(date) {
    this.setState(
      {
        reservationWindow: true,
        roomConfirmWindow: false,
        clickedDate: date
      }
    );
  }

  closeReservationWindow() {
    this.setState({reservationWindow: false});
  }

  openRoomConfirmWindow(roomId) {
    this.setState(
      {
        roomConfirmWindow: true,
        reservationWindow: false,
        selectedRoom: roomId
      }
    );
  }

  closeRoomConfirmWindow() {
    this.setState({roomConfirmWindow: false});
  }

  addNewReservation(reservation, tmp) {
    const reservations = this.state.newReservations;
    reservations.push({aggregateId: {id: tmp}, aggegateVersion: 1, aggregate: reservation});
    this.setState({newReservations: reservations});
    createNewReservation(reservation, (data) => {this.addNewReservationConfirm(data.id.id, tmp)});
    this.closeReservationWindow();
  }

  addNewReservationConfirm(id, tmp) {
    this.setState({
      newReservations: this.state.newReservations.map(r =>
        r.aggregateId.id === tmp ? {aggregateId: {id: id}, aggegateVersion: r.aggegateVersion, aggregate: r.aggregate} : r)});
  }

  render() {
    return (
      <div className="calendar">
        <div className="roomSide">
          <Rooms rooms={this.state.rooms.sort((a,b) => a.aggregateId.id - b.aggregateId.id)}
                 openRoomConfrmWindow={this.openRoomConfirmWindow}/>
        </div>
        <div className="calendarSide">
          <CalendarGrid showNewReservationForm={this.openReservationWindow}
                        selectedDate={this.state.clickedDate}
                        newReservations={this.state.newReservations}
                        rooms={this.state.rooms}/>
        </div>
        {this.state.reservationWindow ? <ReservationWindow startDay={this.state.clickedDate}
                                                           closeReservationWindow={this.closeReservationWindow}
                                                           addNewReservation={this.addNewReservation}/> : null}

        {this.state.roomConfirmWindow ? <RoomConfirmWindow roomId={this.state.selectedRoom.aggregateId}/> : null}
      </div>
    );
  }
}

export default Calendar;