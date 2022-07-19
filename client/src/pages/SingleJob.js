import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PROJECT } from "../utils/queries";
import DriverMap from "../components/DriverMap"


const SingleJob = (props) => {
    const { jobName: jobName } = useParams();

    const { loading, data } = useQuery(QUERY_PROJECT, {
      variables: { jobName: jobName },
    });
  
    const project = data?.getProject || {};
    console.log({ jobName: jobName });
    console.log(project);
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <main>
        <div className="flex-row justify-space-between">
          <div className=''>
                <h2>{project.jobName}</h2>
                
                <DriverMap project={project}/>
                <div>
                </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default SingleJob;