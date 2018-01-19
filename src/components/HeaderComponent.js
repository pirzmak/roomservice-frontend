import React, {Component} from 'react';
import './headerComponent.css'
import Tab from "./utils/tabs/Tab";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="headerComponent">
        <div className="tabs">
          <Tab label={"Kalendarz"} isActive={this.props.location === "/calendar"} onClick={this.props.handleClick} path={"/calendar"}/>
          <Tab label={"Rezerwacje"} isActive={this.props.location === "/reservations"} onClick={this.props.handleClick} path={"/reservations"}/>
          <Tab label={"Pokoje"} isActive={this.props.location === "/rooms"} onClick={this.props.handleClick} path={"/rooms"}/>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;