import React, {Component} from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './reservationLoan.css'

class ReservationLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount,
      date: props.date
    };

    this.toReservationInfo = this.toReservationInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.amount !== this.props.amount) {
      this.setState({amount: nextProps.amount});
    }
    if (nextProps.date !== this.props.date) {
      this.setState({date: nextProps.date});
    }
  }

  toReservationInfo() {
    return {
      loan: {
        money: {
          amount: this.state.amount,
          currency: "PLN"
        },
        date: this.state.date
      },
      clientInfo : {}
    }
  }

  render() {
    return (
      <div className="reservationLoan">
        <div>
          <label className="reservationFormLabel">Zaliczka:</label>
          <input type="number" value={this.state.amount}
                 className="reservationFormInput"
                 onChange={(event) => {
                   this.setState({amount: event.target.value},
                     () => {this.props.handleChange(this.toReservationInfo())});
                 }}/>
        </div>
        <div className="dateLoan">
          <label className="reservationFormTerminLabel">Data wpłaty zaliczki:</label>
          <div className="rowDate">
            <div className="datePicker">
              <div className="datePickerInner">
                <DatePicker
                  selected={this.state.date}
                  className="reservationFormDate datePickerInner"
                  onChange={(date) => {
                    this.setState({date: date},
                      () => {this.props.handleChange(this.toReservationInfo())});
                  }}/>
              </div>
              <span className="input-group-addon datePickerInner reservationDateGlyph">
                        <span className="glyphicon glyphicon-calendar"></span>
                  </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationLoan;