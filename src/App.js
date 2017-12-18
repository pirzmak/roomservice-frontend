import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import ReservationPage from "./pages/ReservationPage";

import './App.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Route exact path="/" component={ReservationPage}/>
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);