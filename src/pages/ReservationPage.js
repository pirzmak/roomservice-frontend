import React, {Component} from 'react';

import CalendarGrid from '../components/calendarView/calendarGrid/CalendarGrid'
import HeaderComponent from '../components/HeaderComponent'

import './loginPage.css'
import '../App.css'
import Calendar from "../components/calendarView/Calendar";

class ReservationPage extends Component {
  render() {
    return (
      <div className="pageContainer">
        <HeaderComponent/>
        <div className="pageContent">
          <Calendar/>
        </div>
      </div>
    );
  }
}

export default ReservationPage;