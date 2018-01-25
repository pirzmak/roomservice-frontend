import React, {Component} from 'react';

import HeaderComponent from '../components/HeaderComponent'

import './loginPage.css'
import '../App.css'
import ReservationView from "../components/reservationsView/ReservationsView";
import {ToastContainer} from "react-toastify";

class ReservationsPage extends Component {
  handleClick(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="pageContainer">
        <HeaderComponent location = {this.props.location.pathname} handleClick = {this.handleClick.bind(this)}/>
        <ToastContainer />
        <div className="pageContent">
          <ReservationView/>
        </div>
      </div>
    );
  }
}

export default ReservationsPage;