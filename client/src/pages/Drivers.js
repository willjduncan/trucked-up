import React from "react";
import DriversList from "../components/Drivers";

import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

import { useMutation } from "@apollo/client";
// import { EDIT_COMPLETE, EDIT_CONFIRM } from "../utils/mutations";
import Auth from "../utils/auth";

const Drivers = () => {
                                // const [editConfirm] = useMutation(EDIT_CONFIRM, {
                                //     errorPolicy: "all",
                                // });
                                // const [editComplete] = useMutation(EDIT_COMPLETE, {
                                //     errorPolicy: "all",
                                // });
                                // const loggedIn = Auth.loggedIn();

                                // //check token to see if user dispatcher or driver
                                // function userdata() {
                                //     const data = Auth.getProfile();
                                //     return data.data.position;
                                // }

                                // // by default QUERY will be for all driver
                                // let req = QUERY_USERS;
                                // // if user is driver req will be changed to QUERY_ME

                                // // by default Not show button for change job status
                                // let displayBtn = "none";
                                // // if user is driver show button and change query name
                                // if (userdata() === "driver") {
                                //     req = QUERY_ME;
                                //     displayBtn = "";
                                // }
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_USERS);
    // const drivers = data?.getdrivers || [];
                                //                                 //   const driver = data?.me?.drivers || [];

                                // // change status of the top job in array of driver's jobs
                                // const buttonHandler = async () => {
                                //     // create array of Not COMLETED jobs
                                //     const driverToDo = driver.filter(
                                //     (driver) => driver.completed === false
                                //     );
                                //     // if array of job 0 - return
                                //     if (driverToDo.length === 0) {
                                //     console.log("driverToDo.length");
                                //     return;
                                //     }
                                //     // if CONFIRMED change COMPLETE to true
                                //     if (driverToDo[0].confirmed) {
                                //     try {
                                //         const data = await editComplete({
                                //         variables: { _id: driverToDo[0]._id },
                                //         });
                                //         if (data) {
                                //         console.log(data);
                                //         // !!!!!!! change to "none"
                                //         displayBtn = "";
                                //         }
                                //     } catch (e) {
                                //         console.error(e);
                                //     }
                                //     } else {
                                //     // if job is NOT CONFIRMED case
                                //     try {
                                //         const data = await editConfirm({
                                //         variables: { _id: driverToDo[0]._id },
                                //         });
                                //     } catch (e) {
                                //         console.error(e);
                                //     }
                                //     }
                                // };

                                
                                const drivers = data || [];
                                if (drivers) {
                                    console.log(drivers.getUsers);

                                } 
  return (
    <main>
                {/* <div id="table-container">
                    <table id="job-list">
                    <thead>
                        <tr>
                        <th>Status of driver</th>
                        <th>Driver's name</th>
                        <th>driver assigned to</th>
                        <th>driver's Client</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                        </tbody>
                    ) : (
                        // if user is driver - render driver
                        <>
                        {userdata() === "dispatcher" ? (
                            <>
                            <DriversList
                                drivers={driver.filter(
                                (driver) => driver.completed === false
                                )}
                                title="Some Feed for today's Job(s)..."
                            />
                            </>
                        ) : (
                            <>
                            <DriversList
                                drivers={drivers}
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
                    CHANGE JOB STATUS
                    </button>
                </div> */}

    </main>
  );
};

export default Drivers;
