import L from "leaflet";

// function getDistance(origin, destination) {
//   // return distance in meters
//   var lon1 = toRadian(origin[1]),
//     lat1 = toRadian(origin[0]),
//     lon2 = toRadian(destination[1]),
//     lat2 = toRadian(destination[0]);

//   var deltaLat = lat2 - lat1;
//   var deltaLon = lon2 - lon1;

//   var a =
//     Math.pow(Math.sin(deltaLat / 2), 2) +
//     Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
//   var c = 2 * Math.asin(Math.sqrt(a));
//   var EARTH_RADIUS = 6371;
//   return c * EARTH_RADIUS * 1000;
// }
// function toRadian(degree) {
//   return (degree * Math.PI) / 180;
// }

function getDistance(origin, destination) {
  var fromLatLng = L.latLng(origin);
  var toLatLng = L.latLng(destination);

  var dis = fromLatLng.distanceTo(toLatLng);

  return dis;
}




// console.log(getDistance([8.499432777777779, 76.89600888888889], [8.500070555555556, 76.89540444444444])) // 97.20064599809417 //  "speed": 33,

// console.log(getDistance([8.500070555555556, 76.89540444444444], [8.5007, 76.89476444444443,])) // 99.25981390794294 //  "speed": 35,

export default getDistance;

