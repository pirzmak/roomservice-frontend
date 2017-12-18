import {getMethod, postMethod} from "../../../utils/MainService";

const link = "reservations/";

export function getAllReservations(onSuccess) {
  getMethod(link + "get-all", onSuccess)
}

