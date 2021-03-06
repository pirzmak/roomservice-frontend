import React, {Component} from 'react';

import './nextprev.css'

class NextPrevButton extends Component {
  render() {
    return (
      <span className="nextprevButton" onClick={() => this.props.onClick()}>
                {this.props.left ? "<<" : ">>"}
      </span>
    );
  }
}

export default NextPrevButton;