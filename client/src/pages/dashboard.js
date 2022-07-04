import JobList from "../components/JobList";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import DriverMap from "../components/DriverMap"
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

  return (
    <main>
      <DriverMap />
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            // if user is driver - render project
            <>
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
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
