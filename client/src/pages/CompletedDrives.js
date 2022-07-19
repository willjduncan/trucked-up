import JobList from "../components/JobList";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS} from "../utils/queries";
import Auth from "../utils/auth";

const CompletedDrives = () => {
  //   // use useQuery hook to make query request
  //   const { loading, data } = useQuery(QUERY_ME_COMPLETE);
  //   // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  //     const { data: userData } = useQuery(QUERY_ME_COMPLETE);
  //   if (data) {

  // }

  //check token to see if user dispatcher or driver
  function userdata() {
    const data = Auth.getProfile();
    return data.data.position;
  }

  // by default QUERY will be for all project
  let req = QUERY_PROJECTS;
  // if user is driver req will be changed to QUERY_ME

  // by default Not show button for change job status
  let displayBtn = "none";
  // if user is driver show button and change query name
  if (userdata() === "driver") {
    req = QUERY_ME;
    displayBtn = "";
  }
  // use useQuery hook to make query request
  const { loading, data } = useQuery(req);
  const projects = data?.getProjects || [];
  const project = data?.me?.projects || [];

  // const projects = data?.getProjects || [];
  // console.log(projects);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <h2 className="table-name">Here are all your projects</h2>
      <div id="table-container">
        <table id="job-list">
          <thead>
            <tr>
              <th className="status-cell">Status</th>
              <th>Client name</th>
              <th>Project name</th>
              <th>Start Time</th>
              <th>Driver</th>
              <th>Pickup address</th>
              <th>Delivery address</th>
              <th>Description</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td>Loading...</td>
              </tr>
            </tbody>
          ) : (
            <>
              <JobList
                projects={project.filter(
                  (project) => project.completed === true
                )}
                title="Some Feed for today's Job(s)..."
              />
            </>
          )}
        </table>
      </div>
    </main>
  );
};

export default CompletedDrives;
