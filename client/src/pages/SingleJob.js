import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PROJECT } from "../utils/queries";
import DriverMap from "../components/DriverMap";
import JobListButton from "../components/JobListButton";

const SingleJob = (props) => {
  const { jobName: jobName } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { jobName: jobName },
  });

  const project = data?.getProject || {};
  console.log(project)

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <div className="single-container">
          <h2 className="job-name">{project.jobName}</h2>
          <h4>{project.description}</h4>
          {project.completed === true ? (
           <> </>
          ):(
            <JobListButton project={project}></JobListButton>
          )}
          <h4>Client: {project.client?.name}</h4>
          <h4>Start Time: {project.startTime}</h4>
          <DriverMap project={project} />
      </div>
    </main>
  );
};

export default SingleJob;
