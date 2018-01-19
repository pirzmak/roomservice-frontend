import React, {Component} from 'react';

import HeaderComponent from '../components/HeaderComponent'

import './loginPage.css'
import '../App.css'
import RoomView from "../components/roomsView/RoomView";
import ReservationView from "../components/reservationsView/ReservationsView";

class ReservationsPage extends Component {
  handleClick(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="pageContainer">
        <HeaderComponent location = {this.props.location.pathname} handleClick = {this.handleClick.bind(this)}/>
        <div className="pageContent">
          <ReservationView/>
        </div>
      </div>
    );
  }
}

export default ReservationsPage;