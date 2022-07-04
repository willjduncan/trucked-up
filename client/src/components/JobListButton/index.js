import React from "react";
import { Link } from "react-router-dom";

const JobList = ({ projects }) => {
  console.log(projects);
  if (!projects.length) {
    return <h3>No projects Yet</h3>;
  }

  return (
    <div>
      <h3>Here all projects</h3>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${project.jobName}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {project.jobName}
              </Link>{" "}
              project on {project.createdAt}
            </p>
            { project.confirmed ? (
            <button className="button">Confirm Job</button>
          ) : (
            <button className="button"> Mark Job as Complete</button>
          )}
            <div className="card-body">
              <Link to={`/project/${project._id}`}>
                <p>{project.description}</p>
              </Link>
            </div>

          </div>
        ))}
    </div>
  );
};

export default JobList;