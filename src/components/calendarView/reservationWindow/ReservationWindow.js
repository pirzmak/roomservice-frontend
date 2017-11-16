import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {now} from '../../utils/index'

import 'react-datepicker/dist/react-datepicker.css';

import {createNewReservation} from "../calendarQueryService/CalendarQueryService"

import './reservationWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";

class ReservationWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      roomId: '',
      startDate: props.startDay,
      endDate: now(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

    handleSubmit(event) {
        const dateFormat = 'YYYY-MM-DD';
        const reservation = {
            from: this.state.startDate.local().format(dateFormat),
            to: this.state.endDate.local().format(dateFormat),
            clientInfo: {
                firstName: this.state.fName,
                lastName: this.state.lName,
                email: this.state.email,
                phone: this.state.phone,
                personalData: null
            },
            roomId: {id: Number(this.state.roomId)},
            discount: null
        };
        createNewReservation(reservation, () => {});
        event.preventDefault();
    }


  render() {
    return (
      <div className="reservationWindow">
        <form onSubmit={this.handleSubmit} className="reservationForm">
          <ExitButton className="reservationExit" onClick={() => this.props.closeReservationWindow()}/>
          <div>
            <label className="reservationFormLabel">FirstName:</label>
            <input type="text" value={this.state.fName}
                   onChange={(event) => this.setState({fName: event.target.value})}/>
          </div>
          <div>
            <label className="reservationFormLabel">LastName:</label>
            <input type="text" value={this.state.lName}
                   onChange={(event) => this.setState({lName: event.target.value})}/>
          </div>
          <div>
            <label className="reservationFormLabel">Od:</label>
            <div className="datePicker">
              <DatePicker
                selected={this.props.startDay}
                onChange={(date) => this.setState({startDate: date})}/>
            </div>
          </div>
          <div>
            <label className="reservationFormLabel">Do:</label>
            <div className="datePicker">
              <DatePicker className="datePicker"
                          selected={this.state.endDate}
                          onChange={(date) => this.setState({endDate: date})}/>
            </div>
          </div>
          <div>
            <label className="reservationFormLabel">Room:</label>
            <input type="number" value={this.state.roomId}
                   onChange={(event) => this.setState({roomId: event.target.value})}/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default ReservationWindow;