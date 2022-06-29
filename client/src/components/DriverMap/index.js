import React from "react";
import { Link } from "react-router-dom";
import MapRender from "../../utils/maps";

const DriverMap = () => {

    function getmap () {
        return MapRender.getDriverCoordinates('1518 Providence Rd, Charlotte NC 28204', '3408 Woodleaf Rd, Charlotte NC 28205')
    }
    getmap();

  return (
    <div id="mapbox">
        <div>Pickup Address</div>
        <li>1518 Providence Rd, Charlotte NC 28204</li>
        <li>3408 Woodleaf Rd, Charlotte NC 28205</li>
      <div id="map"></div>
      <div id="instructions"></div>
    </div>
  );
};

export default DriverMap;
