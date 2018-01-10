import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import ReservationPage from "./pages/ReservationPage";

import './App.css'
import RoomsPage from "./pages/RoomsPage";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Route exact path="/reservations" component={ReservationPage}/>
          <Route exact path="/rooms" component={RoomsPage}/>
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);