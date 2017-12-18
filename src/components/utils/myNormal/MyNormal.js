import React, {Component} from 'react';

import './myNormal.css'

class MyNormal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.label}:  </label>
        {this.props.textArea ?
          <textarea className="textArea"
                    value={this.props.type}
                    onChange={(event) => this.props.onChange(event.target.value)}/> :
          <input className="input" type={this.props.type} value={this.props.value}
                 onChange={(event) => this.props.onChange(event.target.value)}/>
        }
      </div>
    );
  }
}

export default MyNormal;