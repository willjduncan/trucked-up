import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PROJECT } from "../utils/queries";
// import DriverMap from "../components/DriverMap"


const SingleJob = (props) => {
    const { _id: _id } = useParams();

    const { loading, data } = useQuery(QUERY_PROJECT, {
      variables: { id: _id },
    });
  
    const project = data?.project || {};
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <main>
        <div className="flex-row justify-space-between">
          <div className=''>
                {/* <DriverMap project={project}/> */}
                <div>
                <h2></h2>
                </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default SingleJob;