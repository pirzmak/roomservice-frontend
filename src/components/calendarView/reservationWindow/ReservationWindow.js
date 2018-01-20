import React, {Component} from 'react';
import {now, moment} from '../../utils/index'

import {getReservationById} from "../../../services/queryServices/ReservationsQueryService"

import 'react-datepicker/dist/react-datepicker.css';

import './reservationWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";
import ReservationInfo from "./components/ReservationInfo";

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
      discount: null
    };
    this.setState({reservation: reservation});
  }

  handleSubmit(event) {
    const dateFormat = 'YYYY-MM-DD';
    if(!this.state.reservationId) {
      const reservation = {
        from: this.state.reservation.from.local().format(dateFormat),
        to: this.state.reservation.to.local().format(dateFormat),
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
      const tmp = Math.random();
      this.props.addNewReservation(reservation, tmp);
      event.preventDefault();
    } else {
      const reservation = {
        from: this.state.reservation.from.local().format(dateFormat),
        to: this.state.reservation.to.local().format(dateFormat),
        clientInfo: {
          firstName: this.state.reservation.clientInfo.fName,
          lastName: this.state.reservation.clientInfo.lName,
          email: this.state.reservation.clientInfo.email,
          phone: this.state.reservation.clientInfo.phone,
          personalData: null
        },
        roomId: {id: Number(this.state.reservation.roomId)},
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
          <div className="reservationTabs">
            <div className={"reservationTab" + (this.state.tab === 'INFO' ? " activeTab" : "")}>Informacje</div>
            <div className={"reservationTab" + (this.state.tab === 'LOAN' ? " activeTab" : "")}>Zaliczka</div>
            <div className={"reservationTab" + (this.state.tab === 'BOOKED' ? " activeTab" : "")}>Zameldowanie</div>
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
            <input type="submit" value="Submit" className="reservationFormSubmit btn btn-default"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ReservationWindow;