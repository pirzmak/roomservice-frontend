import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {now, moment} from '../../utils/index'

import {getReservationById} from "../../../services/queryServices/ReservationsQueryService"

import 'react-datepicker/dist/react-datepicker.css';

import './reservationWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";

class ReservationWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationId: props.reservationId,
      version: '',
      fName: "Adam",
      lName: '',
      email: '',
      phone: '',
      roomId: '',
      startDate: now(),
      endDate: now(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.reservationId) {
      this.loadReservation(this.state.reservationId)
    }
  }

  loadReservation(id) {
    getReservationById(id, (data) => {
      this.setState(
        {
          version: data.version,
          fName: data.aggregate.clientInfo.firstName,
          lName: data.aggregate.clientInfo.lastName,
          email: data.aggregate.clientInfo.email,
          phone: data.aggregate.clientInfo.phone,
          startDate: moment(data.aggregate.from, "YYYY-MM-DD"),
          endDate: moment(data.aggregate.to, "YYYY-MM-DD"),
          roomId: data.aggregate.roomId.id
        }
      );
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const dateFormat = 'YYYY-MM-DD';
    if(!this.state.reservationId) {
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
      const tmp = Math.random();
      this.props.addNewReservation(reservation, tmp);
      event.preventDefault();
    } else {
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
    }
  }


  render() {
    return (
      <div className="reservationWindow">
        <form onSubmit={this.handleSubmit} className="reservationForm">
          <div className="reservationFormHeader">
            <ExitButton className="reservationExit" onClick={() => this.props.closeReservationWindow()}/>
            <span className="reservationFormHeaderLabel">Add new reservation</span>
          </div>
          <div className="reservationFormContent">
            <div>
              <label className="reservationFormLabel">Imię:</label>
              <input type="text" value={this.state.fName}
                     className="reservationFormInput"
                     onChange={(event) => this.setState({fName: event.target.value})}/>
            </div>
            <div>
              <label className="reservationFormLabel">Nazwisko:</label>
              <input type="text" value={this.state.lName}
                     className="reservationFormInput"
                     onChange={(event) => this.setState({lName: event.target.value})}/>
            </div>
            <div>
              <label className="reservationFormLabel">Telefon:</label>
              <input type="text" value={this.state.phone}
                     className="reservationFormInput"
                     onChange={(event) => this.setState({phone: event.target.value})}/>
            </div>
            <div>
              <label className="reservationFormLabel">Mail:</label>
              <input type="text" value={this.state.email}
                     className="reservationFormInput"
                     onChange={(event) => this.setState({email: event.target.value})}/>
            </div>
            <div className="dateReservation">
              <label className="reservationFormTerminLabel">Termin:</label>
              <div className="rowDate">
                <label className="reservationFormLabel">Od:</label>
                <div className="datePicker">
                  <div className="datePickerInner">
                    <DatePicker
                      selected={this.state.startDate}
                      className="reservationFormDate datePickerInner"
                      onChange={(date) => this.setState({startDate: date})}/>
                  </div>
                  <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
              </div>
              <div className="rowDate rightDateReservation">
                <label className="reservationFormLabel">Do:</label>
                <div className="datePicker">
                  <div className="datePickerInner">
                    <DatePicker className="reservationFormDate"
                                selected={this.state.endDate}
                                onChange={(date) => this.setState({endDate: date})}/>
                  </div>
                  <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
              </div>
            </div>
            <div>
              <label className="reservationFormLabel">Room:</label>
              <input type="number" value={this.state.roomId}
                     className="reservationFormInput"
                     onChange={(event) => this.setState({roomId: event.target.value})}/>
            </div>
            <input type="submit" value="Submit" className="reservationFormSubmit btn btn-default"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ReservationWindow;