import React, {Component} from 'react';
import {now, moment, getMonthDay} from '../../utils/index'

import CalendarRect from '../calendarRect/CalendarRect'
import ReservationRect from '../reservationRect/ReservationRect'
import NextPrevButton from '../../utils/nextprevButton/NextPrevButton'

import {getAllReservations} from "../calendarQueryService/ReservationsQueryService"

import './calendarGrid.css'



class CalendarGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      newReservations: this.props.newReservations,
      reservationsViewModel: [],
      rooms: [],
      selectedDate: now()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newReservations !== this.props.newReservations) {
      this.setState({newReservations: this.props.newReservations});
      this.filterReservations();
    }
  }

  componentDidMount() {
    this.loadReservations();
  }

  filterReservations() {
    const newReservationModel = this.state.reservations.concat(this.state.newReservations).filter(d => {
      return (moment(d.aggregate.from, "YYYY-MM-DD").isAfter(getMonthDay(this.state.selectedDate, 1)) &&
        moment(d.aggregate.from, "YYYY-MM-DD").isBefore(this.state.selectedDate.endOf('month'))) ||
        (moment(d.aggregate.to, "YYYY-MM-DD").isBefore(this.state.selectedDate.endOf('month')) &&
        moment(d.aggregate.to, "YYYY-MM-DD").isAfter(getMonthDay(this.state.selectedDate, 1)))
    }).map(r => {
      return {
        'id': r.aggregateId.id,
        'fromDay': moment(r.aggregate.from, "YYYY-MM-DD").month() !== this.state.selectedDate.month() ?
          getMonthDay(this.state.selectedDate, 1).format("YYYY-MM-DD") : r.aggregate.from,
        'toDay': moment(r.aggregate.to, "YYYY-MM-DD").month() !== this.state.selectedDate.month() ?
          this.state.selectedDate.endOf('month').format("YYYY-MM-DD") : r.aggregate.to,
        'roomId': r.aggregate.roomId,
        'clientInfo': r.aggregate.clientInfo}});
    this.setState(
      {
        reservationsViewModel: newReservationModel
      }
    )
  }

  clickNext() {
    this.setState(
      {
        selectedDate: this.state.selectedDate.add(1, 'M')
      }
    );
    this.filterReservations();
  }

  loadReservations() {
    getAllReservations((data) => {
      this.setState({reservations: data});
      this.filterReservations();
    });
  }

  clickPrev() {
    this.setState(
      {
        selectedDate: this.state.selectedDate.add(-1, 'M')
      }
    );
    this.filterReservations();
  }

  isWeek(i) {
    return moment(this.state.selectedDate.year() + "-" + (this.state.selectedDate.month() + 1) + "-" + (i + 1), "YYYY-MM-DD").isoWeekday() > 5;
  }

  render() {
    return (
      <div className="calendarGrid">
        <table className="calendarTable">
          <caption className="calendarMonth">
            <NextPrevButton className="prevButton" left={true}
                            onClick={() => this.clickPrev()}/>
            {this.state.selectedDate.format('MMMM')}
            <NextPrevButton className="nextButton" left={false}
                            onClick={() => this.clickNext()}/>
          </caption>
          <tbody className="calendarTableBody">
          <tr>
            {[...Array(this.state.selectedDate.daysInMonth())].map((x, i) => {
              return <th className={"calendarCell calendarDay " + (this.isWeek(i) ? "weekDay" : "")} key={i}>
                {moment(this.state.selectedDate.year() + "-" + (this.state.selectedDate.month() + 1) + "-" + (i + 1), "YYYY-MM-DD").format("dd")}
              </th>
            })}
          </tr>
          <tr className="calendarRow">
            {[...Array(this.state.selectedDate.daysInMonth())].map((x, i) => {
              return <th className={"calendarCell calendarDay " + (this.isWeek(i) ? "weekDay" : "")} key={i}>
                {i+1}
              </th>
            })}
          </tr>
          {this.props.rooms.map((room, j) => {
              return <tr key={j} className="calendarRow">
                {[...Array(this.state.selectedDate.daysInMonth())].map((x, i) =>
                  <th key={i} className={"calendarCell calendarDay " + (this.isWeek(i) ? "weekDay" : "")} id={"calendarRect_" + room.aggregateId.id + "_" + getMonthDay(this.state.selectedDate, i + 1).format("YYYY-MM-DD")}>
                    <CalendarRect key={i}
                                  handleClick={this.props.showNewReservationForm}
                                  day={getMonthDay(this.state.selectedDate, i + 1)}/>
                  </th>
                )}
              </tr>
            }
          )}
          </tbody>
        </table>

        {this.props.rooms.length > 0 ? this.state.reservationsViewModel.map((r, i) => <ReservationRect key={r.id}
                                                                                                       fromDay={r.fromDay}
                                                                                                       toDay={r.toDay}
                                                                                                       roomId={r.roomId}
                                                                                                       clientInfo={r.clientInfo}/>) : null}

      </div>
    );
  }
}

export default CalendarGrid;