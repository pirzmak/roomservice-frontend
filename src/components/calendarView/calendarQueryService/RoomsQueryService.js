import {getMethod, postMethod} from "../../../utils/MainService";

const link = "rooms/";

export function getAllRooms(onSuccess) {
  getMethod(link + "get-all", onSuccess)
}

export function getRoomById(id,onSuccess) {
  getMethod(link + "get-by-id/" + id , onSuccess)
}
