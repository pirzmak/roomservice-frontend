import React, {Component} from 'react';
import {now, moment} from '../../utils/index'

import {getReservationById} from "../../../services/queryServices/ReservationsQueryService"

import 'react-datepicker/dist/react-datepicker.css';

import './reservationWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";
import ReservationInfo from "./components/ReservationInfo";
import ReservationLoan from "./components/ReservationLoan";


class ReservationWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationId: props.reservationId,
      reservation: null,
      tab: 'INFO'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.reservationId) {
      this.loadReservation(this.state.reservationId)
    } else {
      this.setState({
        reservation: {
          from: this.props.clickedDate,
          to:  now().local().format("YYYY-MM-DD"),
          clientInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            personalData: null
          },
          roomId: this.props.roomId,
          discount: null
        }
      })
    }
  }

  loadReservation(id) {
    getReservationById(id, (data) => {
      this.setState(
        {
          version: data.version,
          reservation: data.aggregate
        }
      );
    });
  }

  handleChange(reservationInfo) {
    const reservation = {
      from: reservationInfo.from !== undefined ? reservationInfo.from : this.state.reservation.from,
      to: reservationInfo.to !== undefined ? reservationInfo.to : this.state.reservation.to,
      clientInfo: {
        firstName: reservationInfo.clientInfo.firstName !== undefined ? reservationInfo.clientInfo.firstName : this.state.reservation.clientInfo.firstName,
        lastName: reservationInfo.clientInfo.lastName !== undefined ? reservationInfo.clientInfo.lastName : this.state.reservation.clientInfo.lastName,
        email: reservationInfo.clientInfo.email !== undefined ? reservationInfo.clientInfo.email : this.state.reservation.clientInfo.email,
        phone: reservationInfo.clientInfo.phone !== undefined ? reservationInfo.clientInfo.phone : this.state.reservation.clientInfo.phone,
        personalData: null
      },
      roomId: {id: reservationInfo.roomId !== undefined ? Number(reservationInfo.roomId.id) : Number(this.state.reservation.roomId.id)},
      discount: null,
      loan: reservationInfo.loan ? {
        money: {amount: reservationInfo.loan.money.amount,
                currency: reservationInfo.loan.money.currency},
        date: reservationInfo.loan.date} : this.state.reservation.loan
    };
    this.setState({reservation: reservation});
  }

  handleSubmit(event) {

    const reservation = {
      from: this.state.reservation.from,
      to: this.state.reservation.to,
      clientInfo: {
        firstName: this.state.reservation.clientInfo.firstName,
        lastName: this.state.reservation.clientInfo.lastName,
        email: this.state.reservation.clientInfo.email,
        phone: this.state.reservation.clientInfo.phone,
        personalData: null
      },
      roomId: {id: Number(this.state.reservation.roomId.id)},
      discount: null
    };

    if(!this.state.reservationId) {
      const tmp = Math.random();
      this.props.addNewReservation(reservation, tmp);
      event.preventDefault();
    } else {
      this.props.updateReservation(reservation, this.props.reservationId);
      event.preventDefault();
    }
  }


  render() {
    let container;
    return (
      <div className="reservationWindow">
        <form onSubmit={this.handleSubmit} className="reservationForm">
          <div className="reservationFormHeader">
            <ExitButton className="reservationExit" onClick={() => this.props.closeReservationWindow()}/>
            <span className="reservationFormHeaderLabel">Add new reservation</span>
          </div>
          <div className="reservationTabs">
            {this.state.reservationId ?
              <div className={"reservationTab" + (this.state.tab === 'INFO' ? " activeTab" : "")} onClick={() => this.setState({tab: 'INFO'})}>Informacje</div> : ""}
            {this.state.reservationId ?
              <div className={"reservationTab" + (this.state.tab === 'LOAN' ? " activeTab" : "")} onClick={() => this.setState({tab: 'LOAN'})}>Zaliczka</div> : ""}
            {this.state.reservationId ?
              <div className={"reservationTab" + (this.state.tab === 'BOOKED' ? " activeTab" : "")} onClick={() => this.setState({tab: 'BOOKED'})}>Zameldowanie</div> : ""}
          </div>
          <div className="reservationFormContent">
            {this.state.tab === 'INFO' ? <ReservationInfo   handleChange = {this.handleChange}
                                                            reservationId = {this.state.reservationId}
                                                            fName = {this.state.reservation ? this.state.reservation.clientInfo.firstName : ""}
                                                            lName = {this.state.reservation ? this.state.reservation.clientInfo.lastName : ""}
                                                            roomId = {this.state.reservation ? this.state.reservation.roomId.id : 0}
                                                            email = {this.state.reservation ? this.state.reservation.clientInfo.email : ""}
                                                            phone = {this.state.reservation ? this.state.reservation.clientInfo.phone : ""}
                                                            startDate = {this.state.reservation ? moment(this.state.reservation.from, "YYYY-MM-DD") : now()}
                                                            endDate = {this.state.reservation ? moment(this.state.reservation.to, "YYYY-MM-DD") : now()}
                                                            version = {this.state.reservation ? this.state.version : ''}/> : ""}
            {this.state.tab === 'LOAN' ? <ReservationLoan   handleChange = {this.handleChange}
                                                            value = {this.state.reservation && this.state.loan ? this.state.reservation.loan.money.amount : 0}
                                                            date = {this.state.reservation && this.state.loan  ? moment(this.state.reservation.loan.date, "YYYY-MM-DD") : now()}/> : ""}
            <input type="submit" value="Submit" className="reservationFormSubmit btn btn-default"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ReservationWindow;