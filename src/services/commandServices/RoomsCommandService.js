import {getMethod, postMethod} from "../../utils/MainService";

const link = "rooms/";

export function createNewRoom(roomInfo, bedsNr, costPerPerson, onSuccess) {
  postMethod(link + "create", {info: roomInfo, bedsNr: bedsNr, costPerPerson: costPerPerson}, onSuccess)
}

export function changeRoomInfo(id, version, name, description, onSuccess) {
  postMethod(link + "change-room-info", {aggregateId: id, expectedVersion: version, name: name, description: description}, onSuccess)
}

export function changeBedsNr (id, version, nr,onSuccess) {
  postMethod(link + "change-beds-nr", {aggregateId: id, expectedVersion: version, bedsNr: nr}, onSuccess)
}

export function changeRoomCost(id, version, cost, onSuccess) {
  postMethod(link + "change-room-cost", {aggregateId: id, expectedVersion: version, costPerPerson: cost}, onSuccess)
}

export function deleteRoom(id, version, onSuccess) {
  postMethod(link + "delete", {aggregateId: id, expectedVersion: version}, onSuccess)
}

export function activeRoom(id, version, onSuccess) {
  postMethod(link + "active", {aggregateId: id, expectedVersion: version}, onSuccess)
}