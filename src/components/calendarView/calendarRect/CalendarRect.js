import React, {Component} from 'react';

import './calendarRect.css'

class CalendarRect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="calendarRect" onClick={() => this.props.handleClick(this.props.day,null,this.props.roomId)}>
        <div className="calendarRectContent">
        </div>
      </div>
    );
  }
}

export default CalendarRect;