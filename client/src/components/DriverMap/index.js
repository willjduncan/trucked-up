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
      let coordinatesUrl =
      `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${project?.deliveryAddress}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    const latCoord = data.locations[0]?.referencePosition.latitude;
    const longCoord = data.locations[0]?.referencePosition.longitude;
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
