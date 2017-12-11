import {getMethod, postMethod} from "../../../utils/MainService";

const link = "rooms/";

export function createNewRoom(room, onSuccess) {
  postMethod(link + "create", room, onSuccess)
}

export function changeRoomInfo(roomInfo, id, version, onSuccess) {
  postMethod(link + "change-room-info", {aggregateId: id, expectedVersion: version, name: roomInfo.name, description: roomInfo.description}, onSuccess)
}

export function changeBedsNr(nr, id, version, onSuccess) {
  postMethod(link + "change-beds-nr", {aggregateId: id, expectedVersion: version, bedsNr: nr}, onSuccess)
}

export function changeRoomCost(cost, id, version, onSuccess) {
  postMethod(link + "change-room-cost", {aggregateId: id, expectedVersion: version, costPerPerson: cost}, onSuccess)
}

export function deleteRoom(id, version, onSuccess) {
  postMethod(link + "delete", {aggregateId: id, expectedVersion: version}, onSuccess)
}

export function activeRoom(id, version, onSuccess) {
  postMethod(link + "active", {aggregateId: id, expectedVersion: version}, onSuccess)
}