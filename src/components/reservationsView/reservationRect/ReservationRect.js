import React, {Component} from 'react';
import moment from "moment";

import './reservationRect.css'
import {now} from "../../utils/index";

class ReservationRect extends Component {

  status(reservation) {
    if(reservation.loan) {
      return "Opłacona"
    } else if(reservation.checkedDate) {
      return "Zameldowanie"
    } else if(reservation.unCheckedDate) {
      return "Zakończona"
    } else if(moment(reservation.date).add(7, "d").isAfter(now())) {
      return "Brak Zaliczki"
    } else if(moment(reservation.from).isAfter(now())) {
      return "Brak Zameldaowania"
    } else return ""
  }

  error(reservation) {
    return moment(reservation.date).add(7, "d").isAfter(now()) || moment(reservation.from).isAfter(now());
  }

  render() {
    return (
      <div className="reservationRectOuter" onClick={() => this.props.handleClick(this.props.reservation.aggregateId)}>
        <div className="reservationRectInner">
          <div className="reservationRectInfo">
            <span className="reservationRectLabel">Id:</span>
            <span className="reservationRectValue">{this.props.reservation.aggregateId.id ? this.props.reservation.aggregateId.id : ""}</span>

            <span className="reservationRectLabel">Imię:</span>
            <span className="reservationRectValue">{this.props.reservation.aggregate.clientInfo.firstName}</span>
            <span className="reservationRectLabel">Nazwisko:</span>
            <span className="reservationRectValue">{this.props.reservation.aggregate.clientInfo.lastName}</span>


            <span className="reservationRectLabel">Koszt:</span>
            <span className="reservationRectValue">
              {this.props.reservation.aggregate.cost.amount + this.props.reservation.aggregate.cost.currency}</span>

            <span className="reservationRectLabel">Status:</span>
            <span className={"reservationRectValue reservationRectStatus" + (this.error(this.props.reservation.aggregate) ? " error" : "")}>
              {this.status(this.props.reservation.aggregate)}</span>


            <span className="rightContent">
            <span className="reservationRectLabel">Od:</span>
            <span className="reservationRectValue">{this.props.reservation.aggregate.from}</span>

            <span className="reservationRectLabel">Do:</span>
            <span className="reservationRectValue">{this.props.reservation.aggregate.to}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationRect;