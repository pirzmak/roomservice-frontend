import React, {Component} from 'react';

import './roomConfirmWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";

class RoomConfirmWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      bedsNr: 0,
      cost: 0,
      bName: '',
      bDescription: '',
      bBedsNr: 0,
      bCost: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

    handleSubmit(event) {

    }


  render() {
    return (
      <div className="roomConfirmationWindow">
        <form onSubmit={this.handleSubmit} className="">
          <ExitButton className="roomConfirmationExit" onClick={() => this.props.closeReservationWindow()}/>
          <div>
            <label className="roomConfirmationFormLabel">Id: </label>
            <span>{this.state.id}</span>
          </div>
          <div>
            <label className="roomConfirmationFormLabel">Name: </label>
            <input type="text" value={this.state.name}
                   onChange={(event) => this.setState({name: event.target.value})}/>
          </div>
          <div>
            <label className="roomConfirmationFormLabel">Description: </label>
            <textarea className="textAreaConfirmationRoom"
                      value={this.state.description}
                      onChange={(event) => this.setState({description: event.target.value})}/>
          </div>
          <div>
            <label className="roomConfirmationFormLabel">Standart: </label>
            <input type="number" value={this.state.bedsNr}
                   onChange={(event) => this.setState({bedsNr: event.target.value})}/>
          </div>
          <div>
            <label className="roomConfirmationFormLabel">Price:</label>
            <input type="number" value={this.state.cost}
                   onChange={(event) => this.setState({cost: event.target.value})}/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default RoomConfirmWindow;