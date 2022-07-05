import React from "react";
import { Link } from "react-router-dom";
// import { QUERY_PROJECTS } from "../utils/queries";
// import editAssignmentHandler from "./"

const JobList = ({ projects }) => {
  if (!projects.length) {
    return <tbody><tr><td>No projects Yet</td></tr></tbody>;
  }
<<<<<<< HEAD
=======
  console.log({projects})

>>>>>>> 36277ec9 (add signup and login styles)
  return (
    <tbody>
      {/* <h3 style={{ margin: "30px", textAlign: "center" }}>Here all projects</h3> */}

      {projects &&
        projects.map((project) => (
          <tr key={project._id}>
            {/* check confirm and complete to color an icon of td */}
<<<<<<< HEAD
            {( project.confirmed && project.completed ) ? (
=======
            {project.completed ? (
>>>>>>> 36277ec9 (add signup and login styles)
              <td style={{ backgroundColor: "green" }}>completed</td>
            ) : (project.confirmed && !project.completed) ? (
              <td style={{ backgroundColor: "blue" }}>confirmed</td>
            ) : (
              <td style={{ backgroundColor: "white" }}>waiting for responce</td>
            )}
            <td>
<<<<<<< HEAD
              <h4>{project.client?.name}</h4>
=======
              {/* <h4>{project.client.name}</h4> */}
>>>>>>> 36277ec9 (add signup and login styles)
            </td>
            <td>
              <h4>{project.jobName}</h4>
            </td>
            <td>
              <h4>{project.startTime}</h4>
            </td>
            <td>
              {/* <h4>{project.driver.map((driverr) => [driverr.username])}</h4> */}
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
