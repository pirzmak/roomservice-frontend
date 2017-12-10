import React, {Component} from 'react';
import {now} from '../utils/index'

import CalendarGrid from './calendarGrid/CalendarGrid'
import Rooms from './rooms/Rooms'
import ReservationWindow from './reservationWindow/ReservationWindow'

import {getAllRooms} from "./calendarQueryService/RoomsQueryService";
import {createNewReservation} from "./calendarQueryService/ReservationsQueryService"

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationWindow: false,
      clickedDate: now(),
      rooms: [],
      newReservations: [],
      ss: []
    };

    this.setReservationWindow = this.setReservationWindow.bind(this);
    this.closeReservationWindow = this.closeReservationWindow.bind(this);
    this.addNewReservation = this.addNewReservation.bind(this);
    this.addNewReservationConfirm = this.addNewReservationConfirm.bind(this);
  }

  componentDidMount() {
    getAllRooms((data) => {
      this.setState({rooms: data})
    });
  }

  setReservationWindow(date) {
    this.setState(
      {
        reservationWindow: true,
        clickedDate: date
      }
    );
  }

  closeReservationWindow() {
    this.setState({reservationWindow: false});
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
          <Rooms rooms={this.state.rooms.sort((a,b) => a.aggregateId.id - b.aggregateId.id)}/>
        </div>
        <div className="calendarSide">
          <CalendarGrid showNewReservationForm={this.setReservationWindow}
                        selectedDate={this.state.clickedDate}
                        newReservations={[]}
                        rooms={this.state.rooms}/>
        </div>
        {this.state.reservationWindow ? <ReservationWindow startDay={this.state.clickedDate}
                                                           closeReservationWindow={this.closeReservationWindow}
                                                           addNewReservation={this.addNewReservation}/> : null}
      </div>
    );
  }
}

export default Calendar;