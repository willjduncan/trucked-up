import React from "react";
import { Link } from "react-router-dom";
// import { QUERY_driverS } from "../utils/queries";
// import editAssignmentHandler from "./"

const DriversList = ({ drivers }) => {
  if (!drivers.length) {
    return <tbody><tr><td>No drivers Yet</td></tr></tbody>;
  }
  return (
    <tbody>
      {/* <h3 style={{ margin: "30px", textAlign: "center" }}>Here all drivers</h3> */}

      {drivers &&
        drivers.map((driver) => (
          <tr key={driver._id}>
            {/* check confirm and complete to color an icon of td */}
            {( driver.confirmed && driver.completed ) ? (
              <td style={{ backgroundColor: "green" }}>completed</td>
            ) : (driver.confirmed && !driver.completed) ? (
              <td style={{ backgroundColor: "blue" }}>confirmed</td>
            ) : (
              <td style={{ backgroundColor: "white" }}>waiting for responce</td>
            )}
            <td>
              <h4>{driver.client?.name}</h4>
            </td>
            <td>
              <h4>{driver.jobName}</h4>
            </td>
            <td>
              <h4>{driver.startTime}</h4>
            </td>
            <td>
              <h4>{driver.driver.map((driverr) => [driverr.username])}</h4>
            </td>
            <td>
              <h4>{driver.pickUpAddress}</h4>
            </td>
            <td>
              <h4>{driver.deliveryAddress}</h4>
            </td>
            <td>
              <h4>{driver.description}</h4>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default DriversList;
