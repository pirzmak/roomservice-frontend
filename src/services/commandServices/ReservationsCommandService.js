import {postMethod} from "../../utils/MainService";

const link = "reservations/";

export function createNewReservation(reservation, onSuccess, onError) {
  postMethod(link + "create", reservation, onSuccess, onError)
}

export function changeReservationDate(id, version, from, to, onSuccess, onError) {
  postMethod(link + "change-date", {aggregateId: id, expectedVersion: version, from: from, to: to}, onSuccess, onError)
}

export function changeReservationClientInfo(id, version, firstName, lastName, email, phone, personalData, onSuccess, onError) {
  postMethod(link + "change-client-info", {aggregateId: id, expectedVersion: version, personalData: personalData,
    firstName: firstName, lastName: lastName, email: email, phone: phone}, onSuccess, onError)
}

export function changeReservationRoom(id, version, roomId, onSuccess, onError) {
  postMethod(link + "change-room", {aggregateId: id, expectedVersion: version, roomId: roomId}, onSuccess, onError)
}

export function changeReservationDiscount(id, version, discount, onSuccess, onError) {
  postMethod(link + "change-disocunt", {aggregateId: id, expectedVersion: version, discount: discount}, onSuccess, onError)
}

export function changeReservationLoan(id, version, loan, onSuccess, onError) {
  postMethod(link + "change-loan", {aggregateId: id, expectedVersion: version, loan: loan}, onSuccess, onError)
}

export function deleteReservation(id, version, onSuccess, onError) {
  postMethod(link + "change-disocunt", {aggregateId: id, expectedVersion: version}, onSuccess, onError)
}

export function activeReservation(id, version, onSuccess, onError) {
  postMethod(link + "change-disocunt", {aggregateId: id, expectedVersion: version}, onSuccess, onError)
}
