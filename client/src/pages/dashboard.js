import React, { useState } from "react";
import JobList from "../components/JobList";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
// import JobForm from "../components/ThoughtForm";

const Dashboard = () => {
  const [jobtatus, setJobtatus] = useState("");
  const buttonHandler = () => {
    if (jobtatus === { name: "CONFIRM", confirmed: true }) {
      setJobtatus({ name: "COMPLETED", complited: true });
      console.log("COMPLETED!!");
      console.log(jobtatus);
    } else if (jobtatus === "") {
      setJobtatus({ name: "CONFIRM", confirmed: true });
      console.log("CONFIRMED!!");
      console.log(jobtatus);
      document.getElementById("confirm-complete-btn").innerText = "COMPLETE!";
    } else {
      console.log(jobtatus);
      console.log(typeof jobtatus);
    }
  };
  console.log(jobtatus);

  const loggedIn = Auth.loggedIn();
  //check token to see if user dispatcher or driver
  function userdata() {
    const data = Auth.getProfile();
    return data.data.position;
  }
  // by default QUERY will be for all project
  let req = QUERY_PROJECTS;
  // if user is driver req will be changed to QUERY_ME
  let displayBtn = "none";
  if (userdata() === "driver") {
    req = QUERY_ME;
    displayBtn = "";
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
            {loading ? (
              <tbody>
                <tr>
                  <td>Loading...</td>
                </tr>
              </tbody>
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
          </table>
          <button
            id="confirm-complete-btn"
            style={{ display: displayBtn }}
            onClick={buttonHandler}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
