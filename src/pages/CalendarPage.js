import React, {Component} from 'react';

import HeaderComponent from '../components/HeaderComponent'

import './loginPage.css'
import '../App.css'
import Calendar from "../components/calendarView/Calendar";
import {ToastContainer} from "react-toastify";

class CalendarPage extends Component {
  handleClick(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="pageContainer">
        <HeaderComponent location = {this.props.location.pathname} handleClick = {this.handleClick.bind(this)}/>
        <ToastContainer />
        <div className="pageContent">
          <Calendar/>
        </div>
      </div>
    );
  }
}

export default CalendarPage;