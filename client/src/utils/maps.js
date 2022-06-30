
const coordAPIKey = "MjkxNGVjYzM2YjhjNGFkMzg3Yzk5ZDQ2M2Q2MzZjMzE6NzY5OGZhNmYtMDM0MS00YmMyLTk2ZGItMjczMjgwOWIwNWU0";


class MapCoord {

  getCoord(address) {
    let coordinatesUrl =
      "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=" +
      address +
      "&apiKey=" +
      coordAPIKey;
    fetch(coordinatesUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            let lat = data.locations[0].referencePosition.latitude;
            let long = data.locations[0].referencePosition.longitude;
            let coord = [long, lat];
            console.log(coord);
            return coord;
            // getSecondCoordinate(coord, address2);
          });
        }
      })
      .catch(function (error) {
        console.error("An error occurred getting the coordinates", error);
      });
  }

}


export default new MapCoord();
//   const getSecondCoordinate = (address1, address2) => {
//     let coordinatesUrl =
//       "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=" +
//       address2 +
//       "&apiKey=" +
//       coordAPIKey;
//     fetch(coordinatesUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             let lat = data.locations[0].referencePosition.latitude;
//             let long = data.locations[0].referencePosition.longitude;
//             let coord = [long, lat];
//             renderMap(address1, coord);
//           });
//         }
//       })
//       .catch(function (error) {
//         console.error("An error occurred getting the coordinates", error);
//       });
//   }

//   const getDriverCoordinates = (address1, address2) => {
//     let coordinatesUrl =
//       "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=" +
//       address1 +
//       "&apiKey=" +
//       coordAPIKey;
//     fetch(coordinatesUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             let lat = data.locations[0].referencePosition.latitude;
//             let long = data.locations[0].referencePosition.longitude;
//             let coord = [long, lat];
//             getSecondCoordinate(coord, address2);
//           });
//         }
//       })
//       .catch(function (error) {
//         console.error("An error occurred getting the coordinates", error);
//       });
//   }
  
//   var JavaScript = {
//     load: function(src, callback) {
//       var cssLink = document.createElement('link'),
//       loaded;
//       var script = document.createElement('script'),
//       loaded;
//       script.setAttribute('src', src + "js");
//       cssLink.setAttribute('src', src + "css");
//       cssLink.setAttribute('rel', "stylesheet");
//       if (callback) {
//         script.onreadystatechange = script.onload = function() {
//           if (!loaded) {
//             callback();
//           }
//           loaded = true;
//         };
//       }
//       document.getElementsByTagName('head')[0].appendChild(cssLink);
//       document.getElementsByTagName('head')[0].appendChild(script);
//     }
//   };
//   JavaScript.load("https://api.mapbox.com/mapbox-gl-js/v2.8.0/mapbox-gl.", function() {
//     getDriverCoordinates('1518 Providence Rd, Charlotte NC 28204', '3408 Woodleaf Rd, Charlotte NC 28205')
// });

//   const coordAPIKey =
//   "MjkxNGVjYzM2YjhjNGFkMzg3Yzk5ZDQ2M2Q2MzZjMzE6NzY5OGZhNmYtMDM0MS00YmMyLTk2ZGItMjczMjgwOWIwNWU0";
  
//   const renderMap = (pickup, deliver) => {
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoid2lsbGpkdW5jYW4iLCJhIjoiY2wxcnZ0bDAxMGxxZTNvcXEzdTdxZzU3ZiJ9.2K211Cg3BG3AL1k-knpdAA";
//     console.log("pickup:" + pickup);
//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: pickup, // starting position
//       zoom: 10,
//     });
//     // set the bounds of the map
//     const bounds = [
//       [pickup[0] - 0.7, pickup[1] - 0.6],
//       [pickup[0] + 0.7, pickup[1] + 0.6],
//     ];
//     map.setMaxBounds(bounds);

//     const start = pickup;
//     async function getRoute(deliver) {
//       const query = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${deliver[0]},${deliver[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//         { method: "GET" }
//       );
//       const json = await query.json();
//       const data = json.routes[0];
//       const route = data.geometry.coordinates;
//       const geojson = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "LineString",
//           coordinates: route,
//         },
//       };
//       // if the route already exists on the map, we'll reset it using setData
//       if (map.getSource("route")) {
//         map.getSource("route").setData(geojson);
//       }
//       // otherwise, we'll make a new request
//       else {
//         map.addLayer({
//           id: "route",
//           type: "line",
//           source: {
//             type: "geojson",
//             data: geojson,
//           },
//           layout: {
//             "line-join": "round",
//             "line-cap": "round",
//           },
//           paint: {
//             "line-color": "#3887be",
//             "line-width": 5,
//             "line-opacity": 0.75,
//           },
//         });
//       }
//       // get the sidebar and add the instructions
//       const instructions = document.getElementById("instructions");
//       const steps = data.legs[0].steps;

//       let tripInstructions = "";
//       for (const step of steps) {
//         tripInstructions += `<li>${step.maneuver.instruction}</li>`;
//       }
//       instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
//         data.duration / 60
//       )} min 🚚 </strong></p><ol>${tripInstructions}</ol>`;
//     }

//     map.on("load", () => {
//       // make an initial directions request that
//       // starts and ends at the same location
//       getRoute(start);

//       // Add starting point to the map
//       map.addLayer({
//         id: "PickupAddress",
//         type: "circle",
//         source: {
//           type: "geojson",
//           data: {
//             type: "FeatureCollection",
//             features: [
//               {
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                   type: "Point",
//                   coordinates: start,
//                 },
//               },
//             ],
//           },
//         },
//         paint: {
//           "circle-radius": 10,
//           "circle-color": "#3887be",
//         },
//       });

//       const end = {
//         type: "FeatureCollection",
//         features: [
//           {
//             type: "Feature",
//             properties: {},
//             geometry: {
//               type: "Point",
//               coordinates: deliver,
//             },
//           },
//         ],
//       };
//       if (map.getLayer("end")) {
//         map.getSource("end").setData(end);
//       } else {
//         map.addLayer({
//           id: "end",
//           type: "circle",
//           source: {
//             type: "geojson",
//             data: {
//               type: "FeatureCollection",
//               features: [
//                 {
//                   type: "Feature",
//                   properties: {},
//                   geometry: {
//                     type: "Point",
//                     coordinates: deliver,
//                   },
//                 },
//               ],
//             },
//           },
//           paint: {
//             "circle-radius": 10,
//             "circle-color": "#f30",
//           },
//         });
//       }
//       getRoute(deliver);
//     });


  
// }


// // use it
// // JavaScript.load("https://api.mapbox.com/mapbox-gl-js/v2.8.0/mapbox-gl.js", function() {
// //   getDriverCoordinates('1518 Providence Rd, Charlotte NC 28204', '3408 Woodleaf Rd, Charlotte NC 28205')
// // });

//     // function getmap () {
//     //     return MapRender.getDriverCoordinates('1518 Providence Rd, Charlotte NC 28204', '3408 Woodleaf Rd, Charlotte NC 28205')
//     // }

//   return (
//     <div id="mapbox">
//         <div>Pickup Address</div>
//         <li>1518 Providence Rd, Charlotte NC 28204</li>
//         <li>3408 Woodleaf Rd, Charlotte NC 28205</li>
//       <div id="map"></div>
//       <div id="instructions"></div>
//     </div>
//   );
// };

// export default DriverMap;
















// const coordAPIKey =
//   "MjkxNGVjYzM2YjhjNGFkMzg3Yzk5ZDQ2M2Q2MzZjMzE6NzY5OGZhNmYtMDM0MS00YmMyLTk2ZGItMjczMjgwOWIwNWU0";
// mapboxgl.accessToken =
//   "pk.eyJ1Ijoid2lsbGpkdW5jYW4iLCJhIjoiY2wxcnZ0bDAxMGxxZTNvcXEzdTdxZzU3ZiJ9.2K211Cg3BG3AL1k-knpdAA";

// class MapRender {
//   renderMap(pickup, deliver) {
//     console.log("pickup:" + pickup);
//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: pickup, // starting position
//       zoom: 10,
//     });
//     // set the bounds of the map
//     const bounds = [
//       [pickup[0] - 0.7, pickup[1] - 0.6],
//       [pickup[0] + 0.7, pickup[1] + 0.6],
//     ];
//     map.setMaxBounds(bounds);

//     const start = pickup;
//     async function getRoute(deliver) {
//       const query = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${deliver[0]},${deliver[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//         { method: "GET" }
//       );
//       const json = await query.json();
//       const data = json.routes[0];
//       const route = data.geometry.coordinates;
//       const geojson = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "LineString",
//           coordinates: route,
//         },
//       };
//       // if the route already exists on the map, we'll reset it using setData
//       if (map.getSource("route")) {
//         map.getSource("route").setData(geojson);
//       }
//       // otherwise, we'll make a new request
//       else {
//         map.addLayer({
//           id: "route",
//           type: "line",
//           source: {
//             type: "geojson",
//             data: geojson,
//           },
//           layout: {
//             "line-join": "round",
//             "line-cap": "round",
//           },
//           paint: {
//             "line-color": "#3887be",
//             "line-width": 5,
//             "line-opacity": 0.75,
//           },
//         });
//       }
//       // get the sidebar and add the instructions
//       const instructions = document.getElementById("instructions");
//       const steps = data.legs[0].steps;

//       let tripInstructions = "";
//       for (const step of steps) {
//         tripInstructions += `<li>${step.maneuver.instruction}</li>`;
//       }
//       instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
//         data.duration / 60
//       )} min 🚚 </strong></p><ol>${tripInstructions}</ol>`;
//     }

//     map.on("load", () => {
//       // make an initial directions request that
//       // starts and ends at the same location
//       getRoute(start);

//       // Add starting point to the map
//       map.addLayer({
//         id: "PickupAddress",
//         type: "circle",
//         source: {
//           type: "geojson",
//           data: {
//             type: "FeatureCollection",
//             features: [
//               {
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                   type: "Point",
//                   coordinates: start,
//                 },
//               },
//             ],
//           },
//         },
//         paint: {
//           "circle-radius": 10,
//           "circle-color": "#3887be",
//         },
//       });

//       const end = {
//         type: "FeatureCollection",
//         features: [
//           {
//             type: "Feature",
//             properties: {},
//             geometry: {
//               type: "Point",
//               coordinates: deliver,
//             },
//           },
//         ],
//       };
//       if (map.getLayer("end")) {
//         map.getSource("end").setData(end);
//       } else {
//         map.addLayer({
//           id: "end",
//           type: "circle",
//           source: {
//             type: "geojson",
//             data: {
//               type: "FeatureCollection",
//               features: [
//                 {
//                   type: "Feature",
//                   properties: {},
//                   geometry: {
//                     type: "Point",
//                     coordinates: deliver,
//                   },
//                 },
//               ],
//             },
//           },
//           paint: {
//             "circle-radius": 10,
//             "circle-color": "#f30",
//           },
//         });
//       }
//       getRoute(deliver);
//     });
//   }

//   getSecondCoordinate(address1, address2) {
//     let coordinatesUrl =
//       "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=" +
//       address2 +
//       "&apiKey=" +
//       coordAPIKey;
//     fetch(coordinatesUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             let lat = data.locations[0].referencePosition.latitude;
//             let long = data.locations[0].referencePosition.longitude;
//             let coord = [long, lat];
//             renderMap(address1, coord);
//           });
//         }
//       })
//       .catch(function (error) {
//         console.error("An error occurred getting the coordinates", error);
//       });
//   }

//   getDriverCoordinates(address1, address2) {
//     let coordinatesUrl =
//       "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=" +
//       address1 +
//       "&apiKey=" +
//       coordAPIKey;
//     fetch(coordinatesUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             let lat = data.locations[0].referencePosition.latitude;
//             let long = data.locations[0].referencePosition.longitude;
//             let coord = [long, lat];
//             getSecondCoordinate(coord, address2);
//           });
//         }
//       })
//       .catch(function (error) {
//         console.error("An error occurred getting the coordinates", error);
//       });
//   }
// }

// export default new MapRender();
