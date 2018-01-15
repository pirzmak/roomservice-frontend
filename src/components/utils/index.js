import moment from 'moment';
import 'moment/locale/pl';

moment.locale("pl-pl");

export {moment}

export function now() {
  return moment()
}

export function getMonthDay(date, day) {
  return moment(date.year() + "-" + (date.month() + 1) + "-" + day, "YYYY-MM-DD");
}

