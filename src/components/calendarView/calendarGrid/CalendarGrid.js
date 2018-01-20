import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {now, moment, getMonthDay} from '../../utils/index'

import CalendarRect from '../calendarRect/CalendarRect'
import ReservationRect from '../reservationRect/ReservationRect'
import NextPrevButton from '../../utils/nextprevButton/NextPrevButton'

import {getAllReservations} from "../../../services/queryServices/ReservationsQueryService"

import './calendarGrid.css'


class CalendarGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      newReservations: this.props.newReservations,
      reservationsViewModel: [],
      rooms: [],
      diff: 1,
      from: getMonthDay(now(),1),
      to: now().endOf('month')
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
      return (moment(d.aggregate.from, "YYYY-MM-DD").isAfter(getMonthDay(this.state.from, 1)) &&
        moment(d.aggregate.from, "YYYY-MM-DD").isBefore(this.state.to)) ||
        (moment(d.aggregate.to, "YYYY-MM-DD").isBefore(this.state.to) &&
        moment(d.aggregate.to, "YYYY-MM-DD").isAfter(getMonthDay(this.state.from, 1)))
    }).map(r => {
      return {
        'id': r.aggregateId.id,
        'fromDay': moment(r.aggregate.from, "YYYY-MM-DD").month() !== this.state.from.month() ?
          this.state.from.format("YYYY-MM-DD") : r.aggregate.from,
        'toDay': moment(r.aggregate.to, "YYYY-MM-DD").month() !== this.state.from.month() ?
          this.state.to.format("YYYY-MM-DD") : r.aggregate.to,
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
        from: this.state.from.add(1, 'M'),
        to: this.state.to.add(1, 'M')
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
        from: this.state.from.add(-1, 'M'),
        to: this.state.to.add(-1, 'M')
      }
    );
    this.filterReservations();
  }

  isWeek(i) {
    return moment(this.state.from.year() + "-" + (this.state.from.month() + 1) + "-" + (1), "YYYY-MM-DD").add(i, 'd').isoWeekday() > 5;
  }

  isToday(i) {
    return moment(this.state.from.year() + "-" + (this.state.from.month() + 1) + "-" + (1), "YYYY-MM-DD").add(i, 'd').isSame(now(), 'day');
  }

  copyDateFrom(){
    return moment(this.state.from.year() + "-" + (this.state.from.month() + 1) + "-" + (this.state.from.date()));
  }

  error(reservation) {
    if(moment(reservation.date).add(7, "d").isAfter(now())) {
      return "Brak Zaliczki"
    } else if(moment(reservation.from).isAfter(now())) {
      return "Brak Zamelowania"
    } else return null
  }

  render() {
    return (
      <div className="calendarGrid">
        <div className="calendarGridOptions">
          <div className="calendarGridOptionsRow">
            <label>OD:</label>
            <div className="calendarDatePicker">
              <DatePicker
                selected={this.state.from}
                className="calendarDatePicker"
                onChange={(date) => {
                  if(this.state.to.diff(date, 'days') < 7){
                    if(this.state.diff === 3)
                      this.setState({to: date.add(3, 'M')});
                    else if(this.state.diff === 1)
                      this.setState({to: date.add(1, 'M')});
                    else
                      this.setState({to: date.add(7, 'days')});
                  }
                  this.setState({from: date}, () => this.filterReservations());
                }}/>
            </div>
          </div>
          <div className="calendarGridOptionsRow">
            <label>DO:</label>
            <div className="calendarDatePicker">
              <DatePicker
                selected={this.state.to}
                className="calendarDatePicker"
                onChange={(date) => {
                  if(date.diff(this.state.from, 'days') < 7){
                    if(this.state.diff === 3)
                      this.setState({from: date.add(-3, 'M')});
                    else if(this.state.diff === 1)
                      this.setState({from: date.add(-1, 'M')});
                    else
                      this.setState({from: date.add(-7, 'days')});
                  }
                  this.setState({to: date, diff: date.diff(this.state.from)}, () => this.filterReservations());
                }}/>
            </div>
          </div>
          <div className="calendarGridOptionsRight">
            <div className={"calendarGridOptionsRow calendarGridOptionsRowButton" + (this.state.diff === 3 ? " active" : "")} onClick={
              () => this.setState({
                diff: 3,
                from: getMonthDay(now(),1),
                to: now().add(2, 'M').endOf('month')})}>3 miesiące</div>
            <div className={"calendarGridOptionsRow calendarGridOptionsRowButton" + (this.state.diff === 1 ? " active" : "")} onClick={
              () => this.setState({
                diff: 1,
                from: getMonthDay(now(),1),
                to: now().endOf('month')})}>1 miesiąc</div>
          </div>
        </div>
        <table className="calendarTable">
          <caption className="calendarMonth">
            <div className="prevButton">
            <NextPrevButton left={true}
                            onClick={() => this.clickPrev()}/>
            </div>
            <div className="nextButton">
            <NextPrevButton left={false}
                            onClick={() => this.clickNext()}/>
            </div>
          </caption>
          <tbody className="calendarTableBody">
          <tr>
            {[...Array(this.state.to.diff(this.state.from, 'months') + 1)].map((x, i) => {
              return <th className={"calendarCell calendarMonth"}  key={i} colSpan={
                (this.copyDateFrom().add(i, 'M').endOf('month').diff(this.copyDateFrom().add(i, 'M'), 'd')) + 1
              }>
                {this.copyDateFrom().add(i, 'M').format("MMMM")}
              </th>
            })}

          </tr>
          <tr>
            {[...Array(this.state.to.diff(this.state.from, 'days') + 1)].map((x, i) => {
              return <th className={"calendarCell calendarDay" + (this.isWeek(i) ? " weekDay" : "") + (this.isToday(i) ? " today" : "")} key={i}>
                {this.copyDateFrom().add(i, 'd').format("dd")}
              </th>
            })}
          </tr>
          <tr className="calendarRow">
            {[...Array(this.state.to.diff(this.state.from, 'days') + 1)].map((x, i) => {
              return <th className={"calendarCell calendarDay" + (this.isWeek(i) ? " weekDay" : "") + (this.isToday(i) ? " today" : "")} key={i}>
                {this.copyDateFrom().add(i, 'd').date()}
              </th>
            })}
          </tr>
          {this.props.rooms.map((room, j) => {
              return <tr key={j} className="calendarRow">
                {[...Array(this.state.to.diff(this.state.from, 'days') + 1)].map((x, i) =>
                  <th key={i} className={"calendarCell calendarDay" + (this.isWeek(i) ? " weekDay" : "")  + (this.isToday(i) ? " today" : "")} id={"calendarRect_" + room.aggregateId.id + "_" + this.copyDateFrom().add(i, 'd').format("YYYY-MM-DD")}>
                    <CalendarRect key={i}
                                  handleClick={this.props.showNewReservationForm}
                                  day={this.copyDateFrom().add(i, 'd')}/>
                  </th>
                )}
              </tr>
            }
          )}
          </tbody>
        </table>

        {this.props.rooms.length > 0 ? this.state.reservationsViewModel.map((r, i) => <ReservationRect key={Math.random()}
                                                                                                       reservationId={r.id}
                                                                                                       fromDay={r.fromDay}
                                                                                                       toDay={r.toDay}
                                                                                                       roomId={r.roomId}
                                                                                                       clientInfo={r.clientInfo}
                                                                                                       error = {this.error(r)}
                                                                                                       handleClick={this.props.showNewReservationForm}/>) : null}

      </div>
    );
  }
}

export default CalendarGrid;