import React, {Component} from 'react';
import {now} from '../utils/index'

import CalendarGrid from './calendarGrid/CalendarGrid'
import Rooms from './rooms/Rooms'
import ReservationWindow from './reservationWindow/ReservationWindow'

import {getAllRooms} from "./calendarQueryService/RoomsQueryService";

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationWindow: false,
      clickedDate: now(),
      rooms: [],
      newReservations: []
    };

    this.setReservationWindow = this.setReservationWindow.bind(this);
    this.closeReservationWindow = this.closeReservationWindow.bind(this);
    this.addNewReservation = this.addNewReservation.bind(this);
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
    this.setState({newReservations: this.state.newReservations.push({aggregateId: {id: tmp}, aggegateVersion: 1, aggregate: reservation})});
    this.closeReservationWindow();
  }

  addNewReservationConfirm(id, tmp) {
    this.setState({
      newReservations: this.state.newReservations.map(r =>
        r.aggregateId.id === tmp ? {aggregateId: {id: id}, aggegateVersion: r.aggegateVersion, aggregate: r.aggregate} : r)});
    this.closeReservationWindow();
  }

  render() {
    return (
      <div className="calendar">
        <div className="roomSide">
          <Rooms rooms={this.state.rooms}/>
        </div>
        <div className="calendarSide">
          <CalendarGrid showNewReservationForm={this.setReservationWindow}
                        selectedDate={this.state.clickedDate}
                        newReservations={this.state.newReservations}
                        rooms={this.state.rooms}/>
        </div>
        {this.state.reservationWindow ? <ReservationWindow startDay={this.state.clickedDate}
                                                           closeReservationWindow={this.closeReservationWindow}
                                                           addNewReservation={this.addNewReservation}
                                                           addNewReservationConfirm={this.addNewReservationConfirm}/> : null}
      </div>
    );
  }
}

export default Calendar;