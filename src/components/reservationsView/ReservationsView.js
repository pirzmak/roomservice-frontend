import React, {Component} from 'react';

import {getAllReservations} from "../../services/queryServices/ReservationsQueryService";

import './reservationsView.css'
import ReservationRect from "./reservationRect/ReservationRect";
import ReservationConfirmWindow from "./reservationConfirmWindow/ReservationConfirmWindow";

class ReservationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      reservationConfirmWindow: false,
      selectedReservation: -1,
      newReservation: false
    };

    this.openReservationConfirmWindow = this.openReservationConfirmWindow.bind(this);
    this.closeReservationConfirmWindow = this.closeReservationConfirmWindow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addNewRoom = this.addNewRoom.bind(this);
  }

  componentDidMount() {
    getAllReservations((data) => {
      this.setState({reservations: data})
    });
  }

  openReservationConfirmWindow(reservationId) {
    this.setState(
      {
        reservationConfirmWindow: true,
        newReservation: false,
        selectedReservation: reservationId
      }
    );
  }

  closeReservationConfirmWindow() {
    this.setState({reservationConfirmWindow: false, newReservation: false,});
  }

  addNewRoom(room) {
    this.state.rooms.push(room);
    this.setState({reservationConfirmWindow: false, newReservation: false,});
  }

  onChange(room) {
    this.setState({rooms: this.state.rooms.map(r => r.aggregateId.id === room.aggregateId.id ? room : r), roomConfirmWindow: false})
  }

  render() {
    return (
      <div>
        <div className={"reservationView"}>
          {this.state.reservations.map((x, i) =>
            <ReservationRect key={i} reservation={x} handleClick={this.openReservationConfirmWindow} onChange={this.onChange}/>
          )}
        </div>
        {this.state.reservationConfirmWindow ? <ReservationConfirmWindow reservationId={this.state.selectedReservation} close={this.closeReservationConfirmWindow}/> :
          <div className="emptyReservation">Wybierz rezerwację</div>}
      </div>
    );
  }
}

export default ReservationView;