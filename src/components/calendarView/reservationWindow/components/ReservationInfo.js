import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {now, moment} from '../../../utils/index'

import 'react-datepicker/dist/react-datepicker.css';

import './reservationInfo.css'

class ReservationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationId: props.reservationId,
      version: props.reservationId ? props.version : '',
      fName: props.reservationId ? props.fName : '',
      lName: props.reservationId ? props.lName : '',
      email: props.reservationId ? props.email : '',
      phone: props.reservationId ? props.phone : '',
      roomId: props.reservationId ? props.roomId : '',
      startDate: props.reservationId ? props.startDate : now(),
      endDate:  props.reservationId ? props.endDate : now(),
      tab: 'INFO'
    };

    this.toReservationInfo = this.toReservationInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reservationId !== this.props.reservationId) {
      this.setState({reservationId: nextProps.reservationId});
    }
    if (nextProps.reservationId && nextProps.version !== this.props.version) {
      this.setState({version: nextProps.version});
    }
    if (nextProps.reservationId && nextProps.fName !== this.props.fName) {
      this.setState({fName: nextProps.fName});
    }
    if (nextProps.reservationId && nextProps.lName !== this.props.lName) {
      this.setState({lName: nextProps.lName});
    }
    if (nextProps.reservationId && nextProps.email !== this.props.email) {
      this.setState({email: nextProps.email});
    }
    if (nextProps.reservationId && nextProps.phone !== this.props.phone) {
      this.setState({phone: nextProps.phone});
    }
    if (nextProps.reservationId && nextProps.roomId !== this.props.roomId) {
      this.setState({roomId: nextProps.roomId});
    }
    if (nextProps.reservationId && nextProps.startDate !== this.props.startDate) {
      this.setState({startDate: nextProps.startDate});
    }
    if (nextProps.reservationId && nextProps.endDate !== this.props.endDate) {
      this.setState({endDate: nextProps.endDate});
    }
  }

  toReservationInfo() {
    return {
      from: this.state.startDate,
      to: this.state.endDate,
      clientInfo: {
        firstName: this.state.fName,
        lastName: this.state.lName,
        email: this.state.email,
        phone: this.state.phone,
        personalData: null
      },
      roomId: {id: Number(this.state.roomId)},
      discount: null}
  }

  render() {
    return (
      <div className="rservationInfo">
        <div>
          <label className="reservationFormLabel">Imię:</label>
          <input type="text" value={this.state.fName}
                 className="reservationFormInput"
                 onChange={(event) => {
                   this.setState({fName: event.target.value},
                     () => {this.props.handleChange(this.toReservationInfo())});
                 }}/>
        </div>
        <div>
          <label className="reservationFormLabel">Nazwisko:</label>
          <input type="text" value={this.state.lName}
                 className="reservationFormInput"
                 onChange={(event) => {
                   this.setState({lName: event.target.value},
                     () => {this.props.handleChange(this.toReservationInfo())});
                 }}/>
        </div>
        <div>
          <label className="reservationFormLabel">Telefon:</label>
          <input type="text" value={this.state.phone}
                 className="reservationFormInput"
                 onChange={(event) => {
                   this.setState({phone: event.target.value},
                     () => {this.props.handleChange(this.toReservationInfo())});
                 }}/>
        </div>
        <div>
          <label className="reservationFormLabel">Mail:</label>
          <input type="text" value={this.state.email}
                 className="reservationFormInput"
                 onChange={(event) => {
                   this.setState({email: event.target.value},
                     () => {this.props.handleChange(this.toReservationInfo())});
                 }}/>
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
                  onChange={(date) => {
                    this.setState({startDate: date},
                      () => {this.props.handleChange(this.toReservationInfo())});
                  }}/>
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
                            onChange={(date) => {
                              this.setState({endDate: date},
                                () => {this.props.handleChange(this.toReservationInfo())});
                            }}/>
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
                 onChange={(event) => {
                   this.setState({roomId: event.target.value},
                     () => {this.props.handleChange(this.toReservationInfo())});
                 }}/>
        </div>
      </div>
    );
  }
}

export default ReservationInfo;