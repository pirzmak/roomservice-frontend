import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import CalendarPage from "./pages/CalendarPage";
import RoomsPage from "./pages/RoomsPage";
import ReservationsPage from "./pages/ReservationsPage";

import './App.css'
import LoginPage from "./pages/LoginPage";
import {ToastContainer} from "react-toastr";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/calendar" component={CalendarPage}/>
          <Route exact path="/reservations" component={ReservationsPage}/>
          <Route exact path="/rooms" component={RoomsPage}/>
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);