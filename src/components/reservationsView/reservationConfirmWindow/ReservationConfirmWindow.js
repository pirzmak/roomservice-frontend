import React, {Component} from 'react';

import './reservationConfirmWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";
import {getReservationById} from "../../../services/queryServices/ReservationsQueryService";
import DatePicker from "react-datepicker";
import moment from "moment";


class ReservationConfirmWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newReservation: this.props.newReservation,
      id: this.props.reservationId,
      reservation: null,
      bReservation: null
    };
    if (this.props.reservationId)
      getReservationById(this.props.reservationId.id, (reservation) => this.setReservation(reservation));
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setReservation(reservation) {
    this.setState({
      id: reservation.aggregateId,
      reservation: this.toModelView(reservation.aggregate),
      breservation: this.toModelView(reservation.aggregate)
    })
  }

  toModelView(data) {
    const ucd = data.unCheckedDate !== undefined ? moment(data.unCheckedDate, "YYYY-MM-DD"): null;
    const cd = data.unCheckedDate !== undefined ? moment(data.unCheckedDate, "YYYY-MM-DD"): null;
    const l = data.loan !== undefined ? data.loan : null;
    return {
      from : moment(data.from, "YYYY-MM-DD"),
      to : moment(data.to, "YYYY-MM-DD"),
      unCheckedDate : ucd,
      checkedDate : cd,
      date : moment(data.date, "YYYY-MM-DD"),
      clientInfo: data.clientInfo,
      loan: l,
      roomId: data.roomId
    }
  }

  handleSubmit(event) {
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.reservationId && nextProps.reservationId.id !== this.props.reservationId.id) {
    }
    if (this.state.newReservation) {
      this.setState({
        name: '',
        description: '',
        bedsNr: 0,
        cost: 0,
        bName: '',
        bDescription: '',
        bBedsNr: 0,
        bCost: 0
      })
    }
  }

  render() {
    return (
      <div className="reservationConfirmationWindow">
        {this.state.reservation ? (<div className="exitButton">
          <ExitButton className="reservationConfirmationExit" onClick={() => this.props.close()}/>
        </div>) : <div></div> }
        {this.state.reservation ? <form onSubmit={this.handleSubmit} className="">
          <div className="reservationConfirmationWindowContent">
            <div className="reservationConfirmationRow">
              <label className="reservationFormTitle">Dane klienta</label>
              <div className="rowContent">
                <label className="reservationFormLabel">Imię:</label>
                <input type="text" value={this.state.reservation.clientInfo.firstName}
                       className="reservationFormInput"
                       onChange={(event) => {} /*this.setState({reservation: {clientInfo: { firstName : event.target.value}}})*/}/>
              </div>
              <div className="rowContent">
                <label className="reservationFormLabel">Nazwisko:</label>
                <input type="text" value={this.state.reservation.clientInfo.lastName}
                       className="reservationFormInput"
                       onChange={(event) => this.setState({reservation: {clientInfo: { lastName : event.target.value}}})}/>
              </div>
              <div className="rowContent">
                <label className="reservationFormLabel">Telefon:</label>
                <input type="text" value={this.state.reservation.clientInfo.phone}
                       className="reservationFormInput"
                       onChange={(event) => {} /*this.setState({reservation: {clientInfo: { phone : event.target.value}}})*/}/>
              </div>
              <div className="rowContent">
                <label className="reservationFormLabel">Mail:</label>
                <input type="text" value={this.state.reservation.clientInfo.email}
                       className="reservationFormInput"
                       onChange={(event) => {} /*this.setState({reservation: {clientInfo: { email : event.target.value}}})*/}/>
              </div>
            </div>
            <div className="reservationConfirmationRow">
              <div className="rowContent">
                <label className="reservationFormLabel">Pokój:</label>
                <input type="text" value={this.state.reservation.roomId.id}
                       className="reservationFormInput"
                       onChange={(event) => {} /*this.setState({reservation: {roomId: {id: event.target.value}}})*/}/>
              </div>
            </div>
            <div className="reservationConfirmationRow">
              <label className="reservationFormTitle">Termin</label>
              <div className="rowContentColumn">
                <label className="reservationFormLabel">Od:</label>
                <div className="datePicker">
                  <div className="datePickerInner">
                    <DatePicker
                      selected={this.state.reservation.from}
                      className="reservationFormDate datePickerInner"
                      onChange={()=>{}}/>
                  </div>
                  <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
              </div>
              <div className="rowContentColumn">
                <label className="reservationFormLabel">Do:</label>
                <div className="datePicker">
                  <div className="datePickerInner">
                    <DatePicker className="reservationFormDate"
                                selected={this.state.reservation.to}
                                onChange={()=>{}}/>
                  </div>
                  <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
              </div>
            </div>
            <div className="reservationConfirmationRow">
              <label className="reservationFormTitle">Zameldowania</label>
              <div className="rowContentColumn">
                <label className="reservationFormLabel">Zameldowanie:</label>
                <div className="datePicker">
                  <div className="datePickerInner">
                    <DatePicker
                      selected={this.state.reservation.checkedDate ? this.state.reservation.checkedDate : null}
                      className="reservationFormDate datePickerInner"
                      onChange={()=>{}}/>
                  </div>
                  <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
              </div>
              <div className="rowContentColumn">
                <label className="reservationFormLabel">Wymeldowanie:</label>
                <div className="datePicker">
                  <div className="datePickerInner">
                    <DatePicker className="reservationFormDate"
                                selected={this.state.reservation.unCheckedDate ? this.state.reservation.unCheckedDate : null}
                                onChange={()=>{}}/>
                  </div>
                  <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
              </div>
            </div>
            <div className="reservationConfirmationRow">
              <label className="reservationFormTitle">Zaliczka</label>
              <div>
                <div className="rowContentColumn">
                <label className="reservationFormLabel">Kwota:</label>
                <input type="number" value={this.state.loan}
                       className="reservationFormInput"
                       onChange={(event) => this.setState({roomId: event.target.value})}/>
                </div>
                <div className="rowContentColumn">
                  <label className="reservationFormLabel">Data:</label>
                  <div className="datePicker">
                    <div className="datePickerInner">
                      <DatePicker className="reservationFormDate"
                                  selected={this.state.reservation.unCheckedDate ? this.state.reservation.unCheckedDate : null}
                                  onChange={() => {
                                  }}/>
                    </div>
                    <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <input className="save btn btn-default" type="submit" value="Submit"/>
            </div>
          </div>
        </form> : ""}
      </div>
    );
  }
}

export default ReservationConfirmWindow;