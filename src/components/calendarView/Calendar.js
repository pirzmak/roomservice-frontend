import React, { Component } from 'react';
import {now} from '../utils/index'

import CalendarGrid from './calendarGrid/CalendarGrid'
import Rooms from './rooms/Rooms'
import ReservationWindow from './reservationWindow/ReservationWindow'

import './calendar.css'

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationWindow: false,
            clickedDate: now()
        };

        this.setReservationWindow = this.setReservationWindow.bind(this);
    }

    setReservationWindow(date) {
        this.setState(
            {reservationWindow: true,
             clickedDate: date}
        );
    }

    render() {
        return (
            <div className="calendar">
                <div className="roomSide">
                    <Rooms/>
                </div>
                <div className="calendarSide">
                    <CalendarGrid showNewReservationForm={this.setReservationWindow} selectedDate={this.state.clickedDate}/>
                </div>
                {this.state.reservationWindow ? <ReservationWindow startDay={this.state.clickedDate}/> : null}
            </div>
        );
    }
}

export default Calendar;