import React, { useState } from "react";
import { EDIT_CONFIRM, EDIT_COMPLETE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { Popover, Typography } from "@material-ui/core";

const JobListButton = ({ project }) => {
  const [jobState, setJobState] = useState("Completed!");
  const [editConfirm] = useMutation(EDIT_CONFIRM, {
    errorPolicy: "all",
  });
  const [editComplete] = useMutation(EDIT_COMPLETE, {
    errorPolicy: "all",
  });

  const [status, setStatus] = useState(null);
  const loggedIn = Auth.loggedIn();

  let displayBtn = "inline-block";

  if (project.completed === "true") {
    displayBtn = "none";
    setStatus("Completed!");
  }

  const TimePopover = () => {
    setTimeout(() => {
      setAnchor(null);
    }, 3000);
  };

  const [anchor, setAnchor] = useState(null);
  const openPopover = () => {
    let buttonEl = document.getElementById("confirm-complete-btn");
    setAnchor(buttonEl);
    TimePopover();
  };

  // change status of the top job in array of driver's jobs
  const buttonHandler = async () => {
    // if CONFIRMED change COMPLETE to true
    if (project.confirmed) {
      try {
        const data = await editComplete({
          variables: { _id: project._id },
        });
        if (data) {
          // !!!!!!! change to "none"
          displayBtn = "";
          setStatus("Completed!");
        }
      } catch (e) {
        console.error(e);
      }
      openPopover();
    } else {
      // if job is NOT CONFIRMED case
      try {
        const data = await editConfirm({
          variables: { _id: project._id },
        });
      } catch (e) {
        console.error(e);
      }
      openPopover();
    }
  };

  return (
    <div>
      <div>
        <button
          id="confirm-complete-btn"
          className="button"
          style={{ display: displayBtn }}
          onClick={buttonHandler}
          variant="contained"
        >
          CHANGE JOB STATUS
        </button>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <Typography id="update" variant="h6">
            {jobState}
          </Typography>
        </Popover>
      </div>
    </div>
  );
};

export default JobListButton;
