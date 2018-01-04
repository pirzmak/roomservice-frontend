import {getMethod, postMethod} from "../../utils/MainService";

const link = "reservations/";

export function getAllReservations(onSuccess) {
  getMethod(link + "get-all", onSuccess)
}

export function createNewReservation(reservation, onSuccess) {
    postMethod(link + "create", reservation, onSuccess)
}
