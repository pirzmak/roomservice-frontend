import {getMethod, postMethod} from "../../../utils/MainService";

const link = "reservations/";

export function createNewReservation(reservation, onSuccess) {
  postMethod(link + "create", reservation, onSuccess)
}