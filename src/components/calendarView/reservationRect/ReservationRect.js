import React, {Component} from 'react';
import {ItemTypes} from '../../Constants';
import {DragSource} from 'react-dnd';
import PersonInfo from "../../utils/personInfo/PersonInfo";

import "./reservationrect.css"

const reservationSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class ReservationRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aggregateId: this.props.aggregateId,
      aggregateVersion: this.props.aggregateVersion,
      reservation: this.props.reservation,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reservation !== this.props.reservation) {
      this.setState({reservation: this.props.reservation});
      this.setPositions();
    }
    if (nextProps.aggregateId !== this.props.aggregateId) {
      this.setState({aggregateId: this.props.aggregateId});
      this.setPositions();
    }
    if (nextProps.aggregateVersion !== this.props.aggregateVersion) {
      this.setState({aggregateVersion: this.props.aggregateVersion});
      this.setPositions();
    }
  }

  componentWillMount(){
    this.setPositions();
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setPositions());
    this.setPositions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setPositions());
  }

  setPositions(){
    if(this.state)
    this.setState({
      left: this.calcLeft(this.state.reservation.from, this.state.reservation.roomId.id),
      top: this.calcTop(this.state.reservation.from, this.state.reservation.roomId.id),
      width: this.calcWidth(this.state.reservation.from, this.state.reservation.to, this.state.reservation.roomId.id),
      height: this.calcHeight(this.state.reservation.from, this.state.reservation.roomId.id)
    })
  }


  calcLeft(day, id) {
    const rect = document.getElementById("calendarRect_" + id + "_" + day);
    if (rect) {
      const padding = rect.offsetWidth * 0.5 + 3;
      return rect.offsetLeft - rect.offsetParent.offsetLeft + padding;
    }
    return 0
  }

  calcTop(day, id) {
    const rect = document.getElementById("calendarRect_" + id + "_" + day);
    if (rect) {
      const padding = rect.offsetHeight * 0.05;
      return rect.offsetTop - rect.offsetParent.offsetTop + padding;
    }
    return 0
  }

  calcHeight(day, id) {
    const rect = document.getElementById("calendarRect_" + id + "_" + day);
    if (rect)
      return rect.offsetHeight * 0.9;
    return 0;
  }

  calcWidth(from, to, id) {
    return this.calcLeft(to, id) - this.calcLeft(from, id) - 3;
  }

  render() {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div className="reservationRect" style={{
        opacity: isDragging ? 0.5 : 1,
        width: this.state.width,
        height: this.state.height,
        top: this.state.top,
        left: this.state.left
      }}><PersonInfo personInfo={this.props.reservation.clientInfo}/>
      </div>
    );
  }
}

export default DragSource(ItemTypes.RESERVATIONRECT, reservationSource, collect)(ReservationRect);