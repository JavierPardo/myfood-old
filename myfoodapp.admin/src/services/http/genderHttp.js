import { json } from "d3";

export function getAll() {
  var json = [];
  json.push({id : 0, name: "No informa"});
  json.push({id : 1, name: "Hombre"});
  json.push({id : 2, name: "Mujer"});
  return json;
}