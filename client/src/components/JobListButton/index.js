import React, { useState, useEffect } from "react";
import { EDIT_CONFIRM, EDIT_COMPLETE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../../utils/queries";
import { QUERY_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";



const JobListButton = ({project}) => {
  const [editConfirm] = useMutation(EDIT_CONFIRM, {
    errorPolicy: "all",
  });
  const [editComplete] = useMutation(EDIT_COMPLETE, {
    errorPolicy: "all",
  });
  const loggedIn = Auth.loggedIn();

  let displayBtn = "inline-block";


  if (project.completed === "true") {
    displayBtn = "none";
  }

  // change status of the top job in array of driver's jobs
  const buttonHandler = async () => {
    // create array of Not COMLETED jobs
    console.log(project);
    // const projectToDo = project.filter(
    //   (project) => project.completed === false
    // );
    // if array of job 0 - return
    if (project.length === 0) {
      console.log("project.length");
      return;
    }
    // if CONFIRMED change COMPLETE to true
    if (project.confirmed) {
      try {
        const data = await editComplete({
          variables: { _id: project._id },
        });
        if (data) {
          // !!!!!!! change to "none"
          displayBtn = "";
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // if job is NOT CONFIRMED case
      try {
        const data = await editConfirm({
          variables: { _id: project._id },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // if (!projects.length) {
  //   return <h3>No projects Yet</h3>;
  // }

  return (
    <div>
      <button
          id="confirm-complete-btn"
          style={{ display: displayBtn }}
          onClick={buttonHandler}
        >
          CHANGE JOB STATUS
        </button>
    </div>
  );
};

export default JobListButton;

// add confirmation that the state has changed
// clean code and remove unneeded stuff
// remove button from completed drives