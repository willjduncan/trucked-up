import React from "react";
import JobList from "../components/JobList";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { EDIT_COMPLETE, EDIT_CONFIRM } from "../utils/mutations";
import Auth from "../utils/auth";
// import DriverMap from "../components/DriverMap"
// import JobForm from "../components/ThoughtForm";

const Dashboard = () => {

  const [editConfirm] = useMutation(EDIT_CONFIRM, {
    errorPolicy: "all",
  });
  const [editComplete] = useMutation(EDIT_COMPLETE, {
    errorPolicy: "all",
  });

  const loggedIn = Auth.loggedIn();
  //check token to see if user dispatcher or driver
  function userdata() {
    const data = Auth.getProfile();
    return data.data.position;
  }
  // by default QUERY will be for all project
  let req = QUERY_PROJECTS;
  // if user is driver req will be changed to QUERY_ME

  // !!!!!!!!!! change displayBtn from "" to "none"
  let displayBtn = "";
  if (userdata() === "driver") {
    req = QUERY_ME;
    displayBtn = "";
  }
  // use useQuery hook to make query request
  const { loading, data } = useQuery(req);
  //
  const projects = data?.getProjects || [];
  const project = data?.me?.projects || [];

  const buttonHandler = async () => {
    // !!!!!!!!!!! change all projects[2]._id to project._id
    if (projects[0].confirmed) {
      try {
        const data = await editComplete({
          variables: { _id: projects[0]._id },
        });
        if (data) {
          // !!!!!!! change to "none"
          displayBtn = "";
          
          // document.getElementById("").remove();
        }

      } catch (e) {
        console.error(e);
      }

    } else {
      try {
        const data = await editConfirm({
          variables: { _id: projects[0]._id },
        });
        if (data.data.editConfirm.confirmed) {
          console.log(data.data.editConfirm.confirmed);

        }
      } catch (e) {
        console.error(e);
      }
    }
    console.log(projects[0])
  };

  return (
    <main>
      {/* <DriverMap /> */}
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
          >CHANGE JOB STATUS</button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
