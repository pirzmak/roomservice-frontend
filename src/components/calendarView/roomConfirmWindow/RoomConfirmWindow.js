import React, {Component} from 'react';

import './roomConfirmWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";
import MyNormal from "../../utils/myNormal/MyNormal";
import {getRoomById} from "../../../services/queryServices/RoomsQueryService";
import {changeRoomInfo, changeBedsNr, changeRoomCost, createNewRoom} from "../../../services/commandServices/RoomsCommandService";

class RoomConfirmWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoom: this.props.newRoom,
      id: this.props.roomId,
      name: '',
      description: '',
      bedsNr: 0,
      cost: 0,
      bName: '',
      bDescription: '',
      bBedsNr: 0,
      bCost: 0
    };
    if(!this.props.newRoom)
      getRoomById(this.props.roomId.id, (room) => this.setRoom(room));
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setRoom(room) {
    this.setState({
      id: room.aggregateId,
      version: room.version,
      name: room.aggregate.info.name,
      description: room.aggregate.info.description,
      bedsNr: room.aggregate.bedsNr,
      cost: room.aggregate.costPerPerson,
      bName: room.aggregate.info.name,
      bDescription: room.aggregate.info.description,
      bBedsNr: room.aggregate.bedsNr,
      bCost: room.aggregate.costPerPerson
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.newRoom) {
      if (this.state.bName !== this.state.name || this.state.bDescription !== this.state.description) {
        changeRoomInfo(this.state.id, this.state.version, this.state.name, this.state.description, (data) => {
        });
        this.setState({version: this.state.version.version + 1},() => this.props.onChange(this.makeRoom()));
        }
      if (this.state.bBedsNr !== this.state.bedsNr) {
        changeBedsNr(this.state.id, this.state.version, this.state.bedsNr, (data) => {
        });
        this.setState({version: this.state.version.version + 1},() => this.props.onChange(this.makeRoom()));
      }
      if (this.state.cost !== this.state.bCost) {
        changeRoomCost(this.state.id, this.state.version, this.state.cost, (data) => {
        });
        this.setState({version: this.state.version.version + 1},() => this.props.onChange(this.makeRoom()));
      }
    } else {
      createNewRoom({name: this.state.name, description: this.state.description}, this.state.bedsNr, this.state.cost,
        (data) => {
        this.setState({id: data.aggregateId, version: data.aggegateVersion},() => this.props.onChange(this.makeRoom()));
      });
      this.props.addNewRoom(this.makeRoom());
    }
  }

  makeRoom(){
    return {
      aggregateId: this.state.id,
      version: this.state.version,
      aggregate: {
        info: {
          name: this.state.name,
          description: this.state.description
        },
        bedsNr: this.state.bedsNr,
        costPerPerson: this.state.cost,
        deleted: false
      }};
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.newRoom && nextProps.roomId.id !== this.props.roomId.id) {
      getRoomById(this.props.roomId.id, (room) => this.setRoom(room))
    }
    if (this.state.newRoom){
      this.setState({
        name: '',
        description: '',
        bedsNr: 0,
        cost: 0,
        bName: '',
        bDescription: '',
        bBedsNr: 0,
        bCost: 0
      })
    }
  }

  render() {
    return (
      <div className="roomConfirmationWindow">
        <div className="exitButton">
          <ExitButton className="roomConfirmationExit" onClick={() => this.props.close()}/>
        </div>
        <form onSubmit={this.handleSubmit} className="">
          <div className="content">
            <div className="rowField">
              {this.state.id ? <MyNormal label={"Id"} value={this.state.id.id} type={"text"} readOnly={true}/> : ""}
            </div>
            <div className="rowField">
              <MyNormal label={"Nazwa"} value={this.state.name} type={"text"}
                        onChange={(value) => this.setState({name: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Opis"} value={this.state.description} textArea={true}
                        onChange={(value) => this.setState({description: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Liczba miejsc"} value={this.state.bedsNr} type={"number"}
                        onChange={(value) => this.setState({bedsNr: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Cena za dobę"} value={this.state.cost} type={"number"}
                        onChange={(value) => this.setState({cost: value})}/>
            </div>
            <div className="footer">
              <input className="save btn btn-default" type="submit" value="Zapisz"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RoomConfirmWindow;