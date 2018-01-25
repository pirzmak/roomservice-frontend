import React, {Component} from 'react';
import {now} from '../utils/index'
import moment from "moment";

import CalendarGrid from './calendarGrid/CalendarGrid'
import Rooms from './rooms/Rooms'
import ReservationWindow from './reservationWindow/ReservationWindow'
import RoomConfirmWindow from './roomConfirmWindow/RoomConfirmWindow'

import {toast} from 'react-toastify';
import {getAllRooms} from "../../services/queryServices/RoomsQueryService";
import {getAllReservations} from "../../services/queryServices/ReservationsQueryService"
import {
  changeReservationClientInfo,
  changeReservationDate,
  changeReservationDiscount,
  changeReservationLoan,
  changeReservationRoom,
  createNewReservation
} from "../../services/commandServices/ReservationsCommandService"

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationWindow: false,
      clickedDate: now(),
      roomId: null,
      selectedReservation: null,
      rooms: [],
      reservations: [],
      roomConfirmWindow: false,
      selectedRoom: -1,
    };

    this.openReservationWindow = this.openReservationWindow.bind(this);
    this.closeReservationWindow = this.closeReservationWindow.bind(this);
    this.addNewReservation = this.addNewReservation.bind(this);
    this.updateReservation = this.updateReservation.bind(this);
    this.addNewReservationConfirm = this.addNewReservationConfirm.bind(this);

    this.openRoomConfirmWindow = this.openRoomConfirmWindow.bind(this);
    this.closeRoomConfirmWindow = this.closeRoomConfirmWindow.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    getAllRooms((data) => {
      this.setState({rooms: data})
    });
    getAllReservations((data) => {
      this.setState({reservations: data});
    });
  }


  openReservationWindow(date, reservationId, roomId) {
    this.setState(
      {
        reservationWindow: true,
        roomConfirmWindow: false,
        selectedReservation: reservationId,
        clickedDate: date,
        roomId: roomId
      }
    );
  }

  closeReservationWindow() {
    this.setState({reservationWindow: false, selectedReservation: null});
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
    if(this.checkReservation(reservation)) {
      const reservations = this.state.reservations;
      reservations.push({aggregateId: {id: tmp}, aggegateVersion: 1, aggregate: reservation});
      this.setState({reservations: reservations});
      createNewReservation(reservation, (data) => {
        this.addNewReservationConfirm(data.id.id, tmp)
      });
      this.closeReservationWindow();
    } else {
      toast.error("Reservation date is not empty")
    }
  }

  checkReservation(reservation) {
    return this.state.reservations.find(r =>
      (r.aggregate.roomId.id === reservation.roomId.id &&
        (moment(reservation.to, "YYYY-MM-DD").isBetween(moment(r.aggregate.from, "YYYY-MM-DD"),moment(r.aggregate.to, "YYYY-MM-DD")) ||
          moment(reservation.from, "YYYY-MM-DD").isBetween(moment(r.aggregate.from, "YYYY-MM-DD"),moment(r.aggregate.to, "YYYY-MM-DD"))))) === undefined
  }

  updateReservation(reservation, reservationId) {
    const oldReservation = this.state.reservations.find(r => r.aggregateId.id === reservationId);
    if (!moment(reservation.from, "YYYY-MM-DD").isSame((moment(oldReservation.aggregate.from, "YYYY-MM-DD"))) ||
      !moment(reservation.to, "YYYY-MM-DD").isSame((moment(oldReservation.aggregate.to, "YYYY-MM-DD")))) {
      changeReservationDate(oldReservation.aggregateId, oldReservation.version, reservation.from, reservation.to, () => {
      })
    }
    if (this.checkClientInfo(oldReservation.aggregate.clientInfo, reservation.clientInfo)) {
      changeReservationClientInfo(oldReservation.aggregateId, oldReservation.version, reservation.clientInfo.firstName, reservation.clientInfo.lastName,
        reservation.clientInfo.email, reservation.clientInfo.phone, reservation.clientInfo.personalData, () => {
        })
    }
    if (oldReservation.aggregate.roomId.id !== reservation.roomId.id) {
      changeReservationRoom(oldReservation.aggregateId, oldReservation.version, reservation.roomId, () => {
      })
    }
    if (oldReservation.aggregate.loan && reservation.loan &&
      oldReservation.aggregate.loan.money.amount !== reservation.loan.money.amount) {
      changeReservationLoan(oldReservation.aggregateId, oldReservation.version, reservation.loan, () => {
      })
    }
    if (oldReservation.aggregate.discount && reservation.discount &&
      oldReservation.aggregate.discount.amount !== reservation.discount.amount) {
      changeReservationDiscount(oldReservation.aggregateId, oldReservation.version, reservation.discount, () => {
      })
    }
    const reservations = this.state.reservations.map(r => r.aggregateId.id === reservationId ?
      {aggregateId: oldReservation.aggregateId, aggegateVersion: oldReservation.aggegateVersion, aggregate: reservation} : r);
    this.setState({reservations: reservations});
    this.closeReservationWindow();
  }

  checkClientInfo(c1, c2) {
    return c1.firstName !== c2.firstName || c2.lastName !== c1.lastName || c1.email !== c2.email || c1.phone !== c2.phone;
  }

  addNewReservationConfirm(id, tmp) {
    this.setState({
      reservations: this.state.reservations.map(r =>
        r.aggregateId.id === tmp ? {
          aggregateId: {id: id},
          aggegateVersion: r.aggegateVersion,
          aggregate: r.aggregate
        } : r)
    });
  }

  onChange(room) {
    this.setState({
      rooms: this.state.rooms.map(r => r.aggregateId.id === room.aggregateId.id ? room : r),
      roomConfirmWindow: false
    })
  }

  render() {
    return (
      <div className="calendar">
        <div className="roomSide">
          <Rooms rooms={this.state.rooms.sort((a, b) => a.aggregateId.id - b.aggregateId.id)}
                 openRoomConfrmWindow={this.openRoomConfirmWindow}/>
        </div>
        <div className="calendarSide">
          <CalendarGrid showNewReservationForm={this.openReservationWindow}
                        selectedDate={this.state.clickedDate}
                        reservations={this.state.reservations}
                        rooms={this.state.rooms}/>
        </div>
        {this.state.reservationWindow ? <ReservationWindow startDay={this.state.clickedDate}
                                                           roomId={this.state.roomId}
                                                           reservationId={this.state.selectedReservation}
                                                           closeReservationWindow={this.closeReservationWindow}
                                                           updateReservation={this.updateReservation}
                                                           addNewReservation={this.addNewReservation}/> : null}

        {this.state.roomConfirmWindow ? <RoomConfirmWindow newRoom={false}
                                                           roomId={this.state.selectedRoom.aggregateId}
                                                           onChange={this.onChange}
                                                           close={this.closeRoomConfirmWindow}/> : null}
      </div>
    );
  }
}

export default Calendar;