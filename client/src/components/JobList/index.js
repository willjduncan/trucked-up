import React from "react";
import { Link } from "react-router-dom";

const JobList = ({ projects, username }) => {
  if (!projects.length) {
    return <h3>No projects Yet</h3>;
  }
  console.log(projects);

  return (
    <div>
      <h3>{username}</h3>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${project.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {project.username}
              </Link>{" "}
              project on {project.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/project/${project._id}`}>
                <p>{project.projectText}</p>
                <p className="mb-0">
                  Reactions: {project.reactionCount} || Click to{" "}
                  {project.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
