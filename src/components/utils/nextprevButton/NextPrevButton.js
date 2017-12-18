import React, {Component} from 'react';

import './nextprev.scss'

class NextPrevButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="nextprevButton" onClick={() => this.props.onClick()}>
                {this.props.left ? "<<" : ">>"}
      </span>
    );
  }
}

export default NextPrevButton;