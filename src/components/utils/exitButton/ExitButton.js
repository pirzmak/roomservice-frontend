import React, {Component} from 'react';

import './exitButton.scss'

class ExitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="exitButton" onClick={() => this.props.onClick()}>
                x
            </span>
    );
  }
}

export default ExitButton;