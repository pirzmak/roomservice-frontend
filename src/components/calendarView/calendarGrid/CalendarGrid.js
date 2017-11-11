import React, {Component} from 'react';
import {now, moment, getMonthDay} from '../../utils/index'

import CalendarRect from '../calendarRect/CalendarRect'
import ReservationRect from '../reservationRect/ReservationRect'

import {getAllReservations} from "../calendarQueryService/CalendarQueryService"

import './calendarGrid.css'


class CalendarGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            rooms: [1, 2, 3, 4, 5],
            selectedDate: now()
        };
    }

    componentDidMount() {
        getAllReservations((data) => {
            this.setState(
                {
                    reservations: data.filter(d => {
                        return moment(d.aggregate.from, "YYYY-MM-DD").isAfter(getMonthDay(this.state.selectedDate, 1))
                            && moment(d.aggregate.to, "YYYY-MM-DD").isBefore(this.state.selectedDate.endOf('month'))})
                }
            )
        });
    }

    render() {
        return (
            <div className="calendarGrid">
                <table className="calendarTable">
                    <caption className="calendarMonth">
                        {this.state.selectedDate.format('MMMM')}
                    </caption>
                    <tbody>
                    <tr>
                        {[...Array(this.state.selectedDate.daysInMonth())].map((x, i) => {
                            return <th className="calendarDay" key={i}>
                                {moment(this.state.selectedDate.year() + "-" + (this.state.selectedDate.month()+1) + "-" + (i + 1), "YYYY-MM-DD").format("dd")}
                            </th>
                        })}
                    </tr>
                    {this.state.rooms.map((x, j) => {
                            return <tr key={j} className="calendarRow">
                                {[...Array(this.state.selectedDate.daysInMonth())].map((x, i) =>
                                    <th key={i} id={"calendarRect_" + j + "_" + (i + 1)}>
                                        <CalendarRect key={i}
                                                      handleClick={this.props.showNewReservationForm}
                                                      day={getMonthDay(this.state.selectedDate, i+1)}/>
                                    </th>
                                )}
                            </tr>
                        }
                    )}
                    </tbody>
                </table>

                {this.state.reservations.map((r, i) => <ReservationRect key={r.aggregateId.id} reservation={r.aggregate}
                                                                        aggregateId={r.aggregteId}
                                                                        aggregateVersion={r.aggegateVersion}/>)}

            </div>
        );
    }
}

export default CalendarGrid;