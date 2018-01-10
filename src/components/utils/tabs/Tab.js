import React, {Component} from 'react';

import './tab.css'

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={"tab" + (this.props.isActive ? " active" : "")} onClick={() => this.props.onClick(this.props.path)}><div className="tabLabel">{this.props.label}</div></div>
    );
  }
}

export default Tab;