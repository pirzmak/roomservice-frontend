import React, {Component} from 'react';

import './roomConfirmWindow.css'
import ExitButton from "../../utils/exitButton/ExitButton";
import MyNormal from "../../utils/myNormal/MyNormal";

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
  }

  render() {
    return (
      <div className="roomConfirmationWindow">
        <div className="exitButton">
          <ExitButton className="roomConfirmationExit" onClick={() => this.props.closeReservationWindow()}/>
        </div>
        <form onSubmit={this.handleSubmit} className="">
          <div className="content">
            <div className="rowField">
              <MyNormal label={"Id"} value={this.state.id} type={"text"}
                        onChange={(value) => this.setState({id: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Name"} value={this.state.name} type={"text"}
                        onChange={(value) => this.setState({name: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Description"} value={this.state.description} textArea={true}
                        onChange={(value) => this.setState({description: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Standart"} value={this.state.bedsNr} type={"text"}
                        onChange={(value) => this.setState({bedsNr: value})}/>
            </div>
            <div className="rowField">
              <MyNormal label={"Price"} value={this.state.cost} type={"number"}
                        onChange={(value) => this.setState({cost: value})}/>
            </div>
            <div className="footer">
              <input className="save btn btn-default" type="submit" value="Submit"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RoomConfirmWindow;