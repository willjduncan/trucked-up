import React from "react";
import { Link } from "react-router-dom";
// import { QUERY_PROJECTS } from "../utils/queries";
// import editAssignmentHandler from "./"

const JobList = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <tbody>
        <tr>
          <td>No projects Yet</td>
        </tr>
      </tbody>
    );
  }
  
  return (
    <tbody>
      {/* <h3 style={{ margin: "30px", textAlign: "center" }}>Here all projects</h3> */}

      {projects &&
        projects.map((project) => (
          <tr key={project._id}>
            {/* check confirm and complete to color an icon of td */}
            {
              // driver has project but not confirmed
              !project.confirmed && !project.completed ? (
                <td style={{ backgroundColor: "var(--fourth-color)" }}>
                  NOT confirmed the project
                </td>
              ) : project.confirmed && !project.completed ? (
                <td style={{ backgroundColor: "#187fce" }}>CONFIRMED</td>
              ) : project.confirmed && project.completed ? (
                <td style={{ backgroundColor: "#3ba552" }}>COMPLETED</td>
              ) : (
                <td style={{ backgroundColor: "var(--tertiary-color)" }}>
                  waiting for responce
                </td>
              )
            }
            <td>
              <h4>{project.client?.name}</h4>
            </td>
            <td>
              <h4>{project.jobName}</h4>
            </td>
            <td>
              <h4>{project.startTime}</h4>
            </td>
            <td>
              <h4>{project.driver.map((driver) => [driver.username])}</h4>
            </td>
            <td>
              <h4>{project.pickUpAddress}</h4>
            </td>
            <td>
              <h4>{project.deliveryAddress}</h4>
            </td>
            <td>
              <h4>{project.description}</h4>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default JobList;
