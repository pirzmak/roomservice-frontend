import React, {Component} from 'react';

import Room from '../room/Room'

import './rooms.css'

class Rooms extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rooms">
        {this.props.rooms.map((x, i) =>
          <Room key={i}/>
        )}
      </div>
    );
  }
}

export default Rooms;