import {getMethod, postMethod} from "../../utils/MainService";

const link = "reservations/";

export function getAllReservations(onSuccess) {
  getMethod(link + "get-all", onSuccess)
}

export function getReservationById(id, onSuccess) {
  getMethod(link + "get-by-id/" + + id, onSuccess)
}

