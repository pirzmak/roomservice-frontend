import React, {Component} from 'react';

import './room.css'

class Room extends Component {
  getRoomId(room) {
    if(room.aggregate.info !== undefined && room.aggregate.info.name !== "")
      return room.aggregate.info.name;
    return this.props.room.aggregateId.id;
  }

  render() {
    return (
      <div className="roomOuter" onClick={() => this.props.handleClick(this.props.room)}>
        <div className="roomInner">
          <div className="roomInfo">
            <span className="roomLabel">Numer:</span> <span className="roomValue">{this.getRoomId(this.props.room)}</span>
            <span className="roomLabel">Liczba miejsc:</span> <span className="roomValue">{this.props.room.aggregate.bedsNr}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;