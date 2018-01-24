import {getMethod, postMethod} from "../../utils/MainService";

const link = "reservations/";

export function createNewReservation(reservation, onSuccess) {
  postMethod(link + "create", reservation, onSuccess)
}

export function changeReservationDate(id, version, from, to, onSuccess) {
  postMethod(link + "change-date", {aggregateId: id, expectedVersion: version, from: from, to: to}, onSuccess)
}

export function changeReservationClientInfo(id, version, firstName, lastName, email, phone, personalData, onSuccess) {
  postMethod(link + "change-client-info", {aggregateId: id, expectedVersion: version, personalData: personalData,
    firstName: firstName, lastName: lastName, email: email, phone: phone}, onSuccess)
}

export function changeReservationRoom(id, version, roomId, onSuccess) {
  postMethod(link + "change-room", {aggregateId: id, expectedVersion: version, roomId: roomId}, onSuccess)
}

export function changeReservationDiscount(id, version, discount, onSuccess) {
  postMethod(link + "change-disocunt", {aggregateId: id, expectedVersion: version, discount: discount}, onSuccess)
}

export function changeReservationLoan(id, version, loan, onSuccess) {
  postMethod(link + "change-loan", {aggregateId: id, expectedVersion: version, loan: loan}, onSuccess)
}

export function deleteReservation(id, version, onSuccess) {
  postMethod(link + "change-disocunt", {aggregateId: id, expectedVersion: version}, onSuccess)
}

export function activeReservation(id, version, onSuccess) {
  postMethod(link + "change-disocunt", {aggregateId: id, expectedVersion: version}, onSuccess)
}
