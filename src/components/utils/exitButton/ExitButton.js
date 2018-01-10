import React, {Component} from 'react';

import './exitButton.css'

class ExitButton extends Component {
  render() {
    return (
      <span className="exitButton" onClick={() => this.props.onClick()}>
                x
            </span>
    );
  }
}

export default ExitButton;