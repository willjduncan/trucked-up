import JobList from "../components/JobList";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
// import JobForm from "../components/ThoughtForm";

const Dashboard = () => {
  const loggedIn = Auth.loggedIn();
  //check token to see if user dispatcher or driver
  function userdata() {
    const data = Auth.getProfile();
    return data.data.position;
  }
  // by default QUERY will be for all project
  let req = QUERY_PROJECTS;
  // if user is driver req will be changed to QUERY_ME
  if (userdata() === "driver") {
    req = QUERY_ME;
  }
  // use useQuery hook to make query request
  const { loading, data } = useQuery(req);
  //
  const projects = data?.getProjects || [];
  const project = data?.me?.projects || [];
  console.log(projects);
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            // if user is driver - render project
            <>
              <table id="job-list"> 
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Client name</th>
                    <th>Project name</th>
                    <th>Start Time</th>
                    <th>Driver</th>
                    <th>Pickup address</th>
                    <th>Delivery address</th>
                    <th>Description</th>
                  </tr>
                </thead>
                
              {userdata() === "driver" ? (
                <>
                  <JobList
                    projects={project}
                    title="Some Feed for today's Job(s)..."
                  />
                </>
              ) : (
                <>
                  <JobList
                    projects={projects}
                    title="Some Feed for today's Job(s)..."
                  />
                </>
              )}
                
              </table>

            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
