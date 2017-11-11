import React, { Component } from 'react';

import CalendarGrid from '../components/calendarView/calendarGrid/CalendarGrid'
import HeaderComponent from '../components/HeaderComponent'

import './loginPage.css'
import '../App.css'

class LoginPage extends Component {
    render() {
        return (
            <div className="pageContainer">
                <HeaderComponent/>
                <div className="pageContent">
                    <CalendarGrid/>
                </div>
            </div>
        );
    }
}

export default LoginPage;