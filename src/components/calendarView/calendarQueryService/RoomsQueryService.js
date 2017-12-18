import {getMethod, postMethod} from "../../../utils/MainService";

const link = "rooms/";

export function getAllRooms(onSuccess) {
  getMethod(link + "get-all", onSuccess)
}
