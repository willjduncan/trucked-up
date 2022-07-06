import React from "react";
import { Link } from "react-router-dom";
// import { QUERY_driverS } from "../utils/queries";
// import editAssignmentHandler from "./"

const DriversList = ({ drivers }) => {
  if (drivers.length === 0) {
    return (
      <tbody>
        <tr>
          <td>No drivers Yet</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {/* render each driver from array */}
      {drivers.map((driver) => (
        <tr key={driver._id}>
          {/* check confirm and complete to color an icon of td */}

          {/* driver has NO projects: arr.length === 0 */}
          {driver.projects?.length === 0 || !driver.projects ? (
            <td style={{ backgroundColor: "var(--tertiary-color)" }}>
              NO projects
            </td>
          ) : // driver has project but not confirmed it
          driver.projects?.filter(
              (project) => !project.confirmed && !project.completed
            ) ? (
            <td style={{ backgroundColor: "var(--fourth-color)" }}>
              NOT CONFIRMED the project
            </td>
          ) : // driver confirmed the project
          driver.projects?.filter(
              (project) => project.confirmed && !project.completed
            ) ? (
            <td style={{ backgroundColor: "#187fce" }}>CONFIRMED</td>
          ) : //driver completed project
          driver.projects?.filter(
              (project) => project.confirmed && project.completed
            ) ? (
            <td style={{ backgroundColor: "#3ba552" }}>COMPLETED</td>
          ) : (
            <>
              <td>no data</td>
            </>
          )}
          <td>
            <h4>{driver.username}</h4>
          </td>
          <td>
            <h4>{driver.email}</h4>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default DriversList;
