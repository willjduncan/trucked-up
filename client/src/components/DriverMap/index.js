import React, { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const DriverMap = ({ project }) => {
  // let mapLink = "https://www.google.com/maps/dir/" + pickup + "/" + deliver;
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [deliverLat, setDeliverLat] = useState(null);
  const [deliverLong, setDeliverLong] = useState(null);
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  // const [link,setLink] = useState(mapLink)

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [{ lat }, { lng }] },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [{ deliverLat }, { deliverLong }],
        },
      },
    ],
  };

  // Wait for props to pass down before converting coordinates
  setTimeout(() => {
    fetchData1();
    fetchData2();
  }, 200);

  //   fetch coordinates of pickup address and save them to a variable
  async function fetchData1() {
    let pick = project[0].pickUpAddress;
    let coordinatesUrl = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${pick}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    const latCoord = data.locations[0].referencePosition.latitude;
    const longCoord = data.locations[0].referencePosition.longitude;
    setLat(parseFloat(latCoord));
    setLng(parseFloat(longCoord));
    setDone1(true);
  }

  //   fetch coordinates of pickup address and save them to a variable
  async function fetchData2() {
    let drop = project[0].deliveryAddress;
    let coordinatesUrl = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${drop}&apiKey=${process.env.REACT_APP_COORD_API_KEY}`;
    const response = await fetch(coordinatesUrl);
    const data = await response.json();
    const latCoord = data.locations[0]?.referencePosition.latitude;
    const longCoord = data.locations[0]?.referencePosition.longitude;
    setDeliverLat(parseFloat(latCoord));
    setDeliverLong(parseFloat(longCoord));
    setDone2(true);
  }

  //once the coordinates are fetched, render the page
  if (done1 && done2) {
    return (
      <div className="map-containter">
        <div className="address-container">
          <div className="add">
            {" "}
            Pickup (in green):{" "}
            <span id="pickup">{project[0].pickUpAddress}</span>
          </div>
          <CopyToClipboard text={project[0].pickUpAddress}>
            <button className="button">Copy to clipboard</button>
          </CopyToClipboard>
          <div className="add">
            {" "}
            Deliver To (in blue):{" "}
            <span id="deliver">{project[0].deliveryAddress}</span>
          </div>
          <CopyToClipboard text={project[0].deliveryAddress}>
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
            center: [lng, lat],
            zoom: 10,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          style={{ width: 750, height: 600 }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          <Marker longitude={lng} latitude={lat} color="green" />
          <Marker longitude={deliverLong} latitude={deliverLat} color="blue" />
        </Map>
      </div>
    );
  }
};

export default DriverMap;
