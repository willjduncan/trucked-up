import React, {useState, useEffect} from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// let pickup = "3408 Woodleaf Rd, Charlotte NC 28205";
// let deliver = "1518 Providence Rd, Charlotte NC 28207";


const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const DriverMap = ({ project }) => {
    console.log(project);
  // let mapLink = "https://www.google.com/maps/dir/" + pickup + "/" + deliver;
  const [pickupLat, setPickupLat] = useState(null);
  const [pickupLong, setPickupLong] = useState(null);
  const [deliverLat, setDeliverLat] = useState(null);
  const [deliverLong, setDeliverLong] = useState(null);
  // const [viewport, setViewport] = React.useState();
  const [done1, setDone1] = useState(false)
  const [done2, setDone2] = useState(false)
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  // const [link,setLink] = useState(mapLink)
  
  
  const geojson = {
    type: "FeatureCollection",
    features: [
      { type: "Feature", geometry: { type: "Point", coordinates: [{pickupLat},{pickupLong}] } },
      { type: "Feature", geometry: { type: "Point", coordinates:  [{deliverLat},{deliverLong}]} },
    ],
  };


//   componentDidMount() {
//     // when react first renders then it called componentDidMount()
//     console.log("PROJECT")
//     console.log(project[0].pickUpAddress)
//     let pick = project[0].pickUpAddress;
//     console.log(pick);
// let coordinatesUrl =
// `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${pick}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
// const response = await fetch(coordinatesUrl);
// const data = await response.json();
// console.log("data" + data);
// const latCoord = data.locations[0].referencePosition.latitude;
// const longCoord = data.locations[0].referencePosition.longitude;
// setPickupLat(parseFloat(latCoord));
// setPickupLong(parseFloat(longCoord));
// setLat(parseFloat(latCoord));
// setLng(parseFloat(longCoord));
// setDone1(true);
// let drop = project[0].deliveryAddress;
// coordinatesUrl =
// `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${drop}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
// const response2 = await fetch(coordinatesUrl);
// const data2 = await response.json();
// const latCoord2 = data2.locations[0].referencePosition.latitude;
// const longCoord2 = data2.locations[0].referencePosition.longitude;
// setDeliverLat(parseFloat(latCoord2));
// setDeliverLong(parseFloat(longCoord2));
// setDone2(true);
// };


  
<<<<<<< HEAD
  
  const geojson = {
    type: "FeatureCollection",
    features: [
      { type: "Feature", geometry: { type: "Point", coordinates: [{pickupLat},{pickupLong}] } },
      { type: "Feature", geometry: { type: "Point", coordinates:  [{deliverLat},{deliverLong}]} },
    ],
  };
  console.log(project);
  useEffect(() => {
    async function fetchData() {
    let coordinatesUrl =
  `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${project?.pickUpAddress}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    console.log(data);
    const latCoord = data.locations[0]?.referencePosition.latitude;
    const longCoord = data.locations[0]?.referencePosition.longitude;
=======
  useEffect(() => {
      async function fetchData() {
        console.log("PROJECT")
        console.log(project[0].pickUpAddress)
        let pick = project[0].pickUpAddress;
        console.log(pick);
    let coordinatesUrl =
  `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${pick}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    console.log("data" + data)
    const latCoord = data.locations[0].referencePosition.latitude;
    const longCoord = data.locations[0].referencePosition.longitude;
>>>>>>> 36277ec9 (add signup and login styles)
    setPickupLat(parseFloat(latCoord));
    setPickupLong(parseFloat(longCoord));
    setLat(parseFloat(latCoord));
    setLng(parseFloat(longCoord));
    }
    setDone1(true);
    fetchData()
  },[])

  useEffect(() => {
    async function fetchData() {
<<<<<<< HEAD
      let coordinatesUrl =
      `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${project?.deliveryAddress}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    const latCoord = data.locations[0]?.referencePosition.latitude;
    const longCoord = data.locations[0]?.referencePosition.longitude;
=======
        setTimeout(() => {
            console.log("Delayed for 1 second.");
          }, 1000)
        let drop = project[0].deliveryAddress;
      let coordinatesUrl =
      `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${drop}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    const latCoord = data.locations[0].referencePosition.latitude;
    const longCoord = data.locations[0].referencePosition.longitude;
>>>>>>> 36277ec9 (add signup and login styles)
    setDeliverLat(parseFloat(latCoord));
    setDeliverLong(parseFloat(longCoord));
    setDone2(true);
    }
    fetchData()
  },[deliverLong])



    if(done1 && done2) {return (
    <div className="map-containter">
      <div className="address-container">
      <div className="add"> Pickup (in blue): <span id="pickup">1518 Providence Rd, Charlotte NC 28204</span></div>
    <CopyToClipboard text="1518 Providence Rd, Charlotte NC 28204">
    <button className="button">Copy to clipboard</button>
  </CopyToClipboard>
      <div className="add"> Deliver To (in green): <span id="deliver">3408 Woodleaf Rd, Charlotte NC 28205</span></div>
      <CopyToClipboard text="3408 Woodleaf Rd, Charlotte NC 28205">
    <button className="button">Copy to clipboard</button>
  </CopyToClipboard>
      </div>
  {/* <Routes>
  <Route path='/privacy-policy' component={() => { 
     window.location.replace = {link} 
     return null;
}}/>
  </Routes> */}
  {/* <Link to='/privacy-policy'>Find Route on Google Maps</Link> */}
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        center: [lng,lat],
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{width: 750, height: 600, marginLeft: 20}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
      <Marker longitude={pickupLong} latitude={pickupLat} color="green" />
      <Marker longitude={deliverLong} latitude={deliverLat} color="blue" />
    </Map>
    </div>
  );
}
}

export default DriverMap;

// render(<Root />, document.body.appendChild(document.createElement('div')));

//   const map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: pickup, // starting position
//     zoom: 10,
//   });
//   // set the bounds of the map
//   const bounds = [
//     [pickup[0] - 0.7, pickup[1] - 0.6],
//     [pickup[0] + 0.7, pickup[1] + 0.6],
//   ];
//   map.setMaxBounds(bounds);

//   const start = pickup;
//   async function getRoute(deliver) {
//     const query = await fetch(
//       `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${deliver[0]},${deliver[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//       { method: "GET" }
//     );
//     const json = await query.json();
//     const data = json.routes[0];
//     const route = data.geometry.coordinates;
//     const geojson = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "LineString",
//         coordinates: route,
//       },
//     };
//     // if the route already exists on the map, we'll reset it using setData
//     if (map.getSource("route")) {
//       map.getSource("route").setData(geojson);
//     }
//     // otherwise, we'll make a new request
//     else {
//       map.addLayer({
//         id: "route",
//         type: "line",
//         source: {
//           type: "geojson",
//           data: geojson,
//         },
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#3887be",
//           "line-width": 5,
//           "line-opacity": 0.75,
//         },
//       });
//     }
//     // get the sidebar and add the instructions
//     const instructions = document.getElementById("instructions");
//     const steps = data.legs[0].steps;

//     let tripInstructions = "";
//     for (const step of steps) {
//       tripInstructions += `<li>${step.maneuver.instruction}</li>`;
//     }
//     instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
//       data.duration / 60
//     )} min 🚚 </strong></p><ol>${tripInstructions}</ol>`;
//   }

//   map.on("load", () => {
//     // make an initial directions request that
//     // starts and ends at the same location
//     getRoute(start);

//     // Add starting point to the map
//     map.addLayer({
//       id: "PickupAddress",
//       type: "circle",
//       source: {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [
//             {
//               type: "Feature",
//               properties: {},
//               geometry: {
//                 type: "Point",
//                 coordinates: start,
//               },
//             },
//           ],
//         },
//       },
//       paint: {
//         "circle-radius": 10,
//         "circle-color": "#3887be",
//       },
//     });

//     const end = {
//       type: "FeatureCollection",
//       features: [
//         {
//           type: "Feature",
//           properties: {},
//           geometry: {
//             type: "Point",
//             coordinates: deliver,
//           },
//         },
//       ],
//     };
//     if (map.getLayer("end")) {
//       map.getSource("end").setData(end);
//     } else {
//       map.addLayer({
//         id: "end",
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
//                   coordinates: deliver,
//                 },
//               },
//             ],
//           },
//         },
//         paint: {
//           "circle-radius": 10,
//           "circle-color": "#f30",
//         },
//       });
//     }
//     getRoute(deliver);
//   });
// }
