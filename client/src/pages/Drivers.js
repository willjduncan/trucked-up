import React from "react";
import DriversList from "../components/Drivers";

import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

import { useMutation } from "@apollo/client";
// import { EDIT_COMPLETE, EDIT_CONFIRM } from "../utils/mutations";
import Auth from "../utils/auth";

const Drivers = () => {
  //check token to see if user dispatcher or driver
  function userdata() {
    const data = Auth.getProfile();
    return data.data.position;
  }

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_USERS);

  const users = data?.getUsers || [];

  return (
    <main>
      <div id="table-container">
        <h2 className="table-name">
          Here all drivers
        </h2>
        <table id="job-list">
          <thead>
            <tr>
              <th className="status-cell">Status of driver</th>
              <th>Driver's name</th>
              <th>Driver's email</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td>Loading...</td>
              </tr>
            </tbody>
          ) : (
            // if user is "dispatcher" - render DriversList
            <>
              {userdata() === "dispatcher" ? (
                <>
                  <DriversList
                    drivers={users.filter((user) => user.position === "driver")}
                    title="Some Feed for company drivers..."
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </table>
      </div>
    </main>
  );
};

export default Drivers;
