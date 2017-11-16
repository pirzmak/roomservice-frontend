import React, {Component} from 'react';
import {ItemTypes} from '../../Constants';
import {DragSource} from 'react-dnd';
import PersonInfo from "../../utils/personInfo/PersonInfo";

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
      reservation: this.props.reservation
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reservation !== this.props.reservation) {
      this.setState({reservation: this.props.reservation});
    }
    if (nextProps.aggregateId !== this.props.aggregateId) {
      this.setState({aggregateId: this.props.aggregateId});
    }
    if (nextProps.aggregateVersion !== this.props.aggregateVersion) {
      this.setState({aggregateVersion: this.props.aggregateVersion});
    }
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
      left: this.calcLeft(new Date(this.state.reservation.from).getDate(), this.state.reservation.roomId.id),
      top: this.calcTop(new Date(this.state.reservation.from).getDate(), this.state.reservation.roomId.id),
      width: this.calcWidth(new Date(this.state.reservation.from).getDate(), new Date(this.state.reservation.to).getDate(), this.state.reservation.roomId.id)
    })
  }


  calcLeft(day, id) {
    const rect = document.getElementById("calendarRect_" + id + "_" + day);
    if (rect) {
      const padding = rect.offsetWidth * 0.5;
      return rect.offsetLeft - rect.offsetParent.offsetLeft + padding;
    }
    return 0
  }

  calcTop(day, id) {
    const rect = document.getElementById("calendarRect_" + id + "_" + day);
    if (rect) {
      const padding = rect.offsetHeight * 0.2;
      return rect.offsetTop - rect.offsetParent.offsetTop + padding;
    }
    return 0
  }

  calcWidth(from, to, id) {
    return this.calcLeft(to, id) - this.calcLeft(from, id);
  }

  render() {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        width: this.state.width,
        height: 58,
        backgroundColor: 'red',
        position: 'absolute',
        top: this.state.top,
        left: this.state.left
      }}><PersonInfo personInfo={this.props.reservation.clientInfo}/>
      </div>
    );
  }
}

export default DragSource(ItemTypes.RESERVATIONRECT, reservationSource, collect)(ReservationRect);