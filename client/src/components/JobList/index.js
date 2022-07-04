import React from "react";
import { Link } from "react-router-dom";
// import { QUERY_PROJECTS } from "../utils/queries";
// import editAssignmentHandler from "./"

const JobList = ({ projects }) => {
  if (!projects.length) {
    return <tbody><tr><td>No projects Yet</td></tr></tbody>;
  }

  return (
<<<<<<< HEAD
    <tbody>
      {/* <h3 style={{ margin: "30px", textAlign: "center" }}>Here all projects</h3> */}

      {projects &&
        projects.map((project) => (
          <tr key={project._id}>
            {/* check confirm and complete to color an icon of td */}
            {project.complited ? (
              <td style={{ backgroundColor: "green" }}>completed</td>
            ) : project.confirmed ? (
              <td style={{ backgroundColor: "blue" }}>confirmed</td>
            ) : (
              <td style={{ backgroundColor: "" }}>waiting for responce</td>
            )}
            <td>
              <h4>{project.client.name}</h4>
            </td>
            <td>
              <h4>{project.jobName}</h4>
            </td>
            <td>
              <h4>{project.startTime}</h4>
            </td>
            <td>
              <h4>{project.driver.map((driverr) => [driverr.username])}</h4>
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
=======
    <div >
      <h3 style={{ margin: "30px", textAlign: "center"}}>Here all projects</h3>
      <div style={{ margin: "50px", display: "flex" }}>
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
              className=""
              style={{ margin: "30px", width: "300px" }}
            >
              <button style={{ height: "25px", width: "100%" }}>hel</button>
              <div className="" style={{ marginBottom: "5px" }}>
                <h3>Client name:</h3>
                <Link to={`/client/${project.client.name}`}>
                  <h4>{project.client.name}</h4>
                </Link>
              </div>
              <div>
                <h3>Project name:</h3>
                <h4 className="">
                  {/* <Link
                  to={`/profile/${project.jobName}`}
                  style={{  }}
                  className=""
                > */}
                  {project.jobName}
                  {/* </Link>{" "} */}
                </h4>
              </div>
              <div>
                <h3>Drivers:</h3>
                <p className="">
                  - {project.driver.map((driverr) => [driverr.username])}
                </p>
              </div>
              {/* button need event handler func to edit assignments for drivers */}
              <button
              // onClick={editAssignmentHandler}
              >
                Edit
              </button>
            </div>
          ))}
      </div>
    </div>
>>>>>>> ff239235 (working on dashboard)
  );
};

export default JobList;
