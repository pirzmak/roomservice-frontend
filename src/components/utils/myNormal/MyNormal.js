import React, {Component} from 'react';

import './myNormal.css'

class MyNormal extends Component {
  render() {
    return (
      <div>
        <label className="label">{this.props.label}:  </label> {this.props.readOnly ? <span className="valueMyNormal">{this.props.value}</span> : ""}
        {!this.props.readOnly ?
        this.props.textArea ?
          <textarea className="textArea"
                    value={this.props.value}
                    onChange={(event) => this.props.onChange(event.target.value)}/> :
          <input className="input" type={this.props.type} value={this.props.value}
                 onChange={(event) => this.props.onChange(event.target.value)}/>
         : "" }
      </div>
    );
  }
}

export default MyNormal;