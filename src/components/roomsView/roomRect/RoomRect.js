import React, {Component} from 'react';

import './roomRect.css'
import MyNormal from "../../utils/myNormal/MyNormal";

class RoomRect extends Component {
  getRoomName(room) {
    if(room.aggregate.info !== undefined && room.aggregate.info.name !== "")
      return room.aggregate.info.name;
    return "-";
  }

  getRoomDescription(room) {
    if(room.aggregate.info !== undefined && room.aggregate.info.description !== "")
      return room.aggregate.info.description;
    return "-";
  }

  render() {
    return (
      <div className="roomRectOuter" onClick={() => this.props.handleClick(this.props.room)}>
        <div className="roomRectInner">
          <div className="roomRectInfo">
            <span className="roomRectLabel">Id:</span>{ this.props.room.aggregateId ?
            <span className="roomRectValue"> {this.props.room.aggregateId.id}</span> : ""}
            <span className="roomRectLabel">Standart:</span><span className="roomRectValue"> {this.props.room.aggregate.bedsNr}</span>
            <span className="roomRectLabel">Cena:</span><span className="roomRectValue">
            {this.props.room.aggregate.costPerPerson.amount} {this.props.room.aggregate.costPerPerson.currency} </span>
            <div className="roomRectOtherInfo">
              <span className="roomRectLabel">Inne informacje</span>
              <MyNormal label={"Nazwa"} value={this.getRoomName(this.props.room)} type={"text"} readOnly={true}/>
              <MyNormal label={"Opis"} value={this.getRoomDescription(this.props.room)} texArea={true} readOnly={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomRect;