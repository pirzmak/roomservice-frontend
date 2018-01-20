import React, {Component} from 'react';
import {moment} from '../../utils/index'
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
      fromDay: this.props.fromDay,
      toDay: this.props.toDay,
      roomId: this.props.roomId
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fromDay !== this.props.fromDay) {
      this.setState({
        fromDay: nextProps.fromDay},() => this.setPositions());
    }
    if (nextProps.toDay !== this.props.toDay) {
      this.setState({
        toDay: nextProps.toDay},() => this.setPositions());
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
      left: this.calcLeft(this.state.fromDay, this.state.roomId.id),
      top: this.calcTop(this.state.fromDay, this.state.roomId.id),
      width: this.calcWidth(this.state.fromDay, this.state.toDay, this.state.roomId.id),
      height: this.calcHeight(this.state.fromDay, this.state.roomId.id)
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
    const colors = ["#a24057","#606692","#3a85a8","#42977e","#4aaa54","#629363","#7e6e85","#9c509b", "#c4625d",
                    "#eb751f","#ff9709","#ffc81d","#fff830","#e1c62f","#ad5a36","#cc6a6f","#e086b5","#bc8fa7"];
    return connectDragSource(
      <div onClick={() => this.props.handleClick(null,this.props.reservationId)} className={"reservationRect" + (this.props.error ? " error" : "")} style={{
        opacity: isDragging ? 0.5 : 1,
        width: this.state.width,
        height: this.state.height,
        top: this.state.top,
        left: this.state.left,
        backgroundColor: colors[(moment(this.props.fromDay).day()+moment(this.props.fromDay).daysInMonth()+this.state.roomId.id)%colors.length]
      }}><PersonInfo personInfo={this.props.clientInfo}/>
        {this.props.error ? <div>{this.props.error}</div> : ""}
      </div>
    );
  }
}

export default DragSource(ItemTypes.RESERVATIONRECT, reservationSource, collect)(ReservationRect);