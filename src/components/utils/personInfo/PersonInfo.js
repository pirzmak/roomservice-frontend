import React, {Component} from 'react';

import './personInfo.scss'

class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: this.props.personInfo
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.personInfo !== this.props.personInfo) {
      this.setState({personInfo: this.props.personInfo});
    }
  }

  simpleName() {
    if (this.state.personInfo)
      return this.state.personInfo.firstName + " " + this.state.personInfo.lastName;
    else
      return "";
  }

  render() {
    return (
      <span className="">
                {this.simpleName()}
            </span>
    );
  }
}

export default PersonInfo;