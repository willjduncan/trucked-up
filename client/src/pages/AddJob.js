import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/mutations";
// import { QUERY_CLIENT, QUERY_ME } from "../utils/queries";

const AddJobForm = () => {
  const [jobName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClient] = useState("");
  const [driverEmail, setEmail] = useState("");
  const [pickUpAddress, setPickup] = useState("");
  const [deliveryAddress, setDeliver] = useState("");
  const [addJob] = useMutation(ADD_PROJECT);
  // , {
  //   update(cache, { data: { addJob } }) {
  // try {
  //   // update me array's cache
  //   const { me } = cache.readQuery({ query: QUERY_ME });
  //   cache.writeQuery({
  //     query: QUERY_ME,
  //     data: { me: { ...me, jobs: [...me.jobs, addJob] } },
  //   });
  // } catch (e) {
  //   console.warn("First job insertion by user!");
  // }

  // update job array's cache
  // const { jobs } = cache.readQuery({ query: QUERY_CLIENT });
  // cache.writeQuery({
  //   query: QUERY_CLIENT,
  //   data: { jobs: [addJob, ...jobs] },
  // });
  //   },
  // });
const [errors, setErrors] = useState({});
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleClientChange = (event) => {
    setClient(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePickupChange = (event) => {
    setPickup(event.target.value);
  };
  const handleDeliverChange = (event) => {
    setDeliver(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add thought to database
      const response = await addJob({
        variables: { jobName, description, clientName, driverEmail, pickUpAddress, deliveryAddress },
      });

      if (response.errors) {
        setErrors(response.errors[0].extensions.errors);
        console.table(response.errors[0]);
      }
      // clear form value
      setName("");
      setEmail("");
      setDescription("");
      setDeliver("");
      setPickup("");
      setClient("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form id="addJobForm" onSubmit={handleFormSubmit}>
        <div>
          <label>Job Name
          <input
            placeholder="Give a title to this assignment"
            name="jobname"
            value={jobName}
            onChange={handleNameChange}
            className="form-input col-12 col-md-9"
          ></input>
          </label>
        </div>
        <div>
          <label>Job Descriptionription
          <textarea
            placeholder="Descriptionribe any additional useful information here"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="form-input col-12 col-md-9"
          ></textarea>
          </label>
        </div>
        <div>
          <label>Client Name
          <input
            placeholder="Name the client here"
            name="client"
            value={clientName}
            onChange={handleClientChange}
            className="form-input col-12 col-md-9"
          ></input>
          </label>
        </div>
        <div>
          <label>Driver Name
          <input
            placeholder="Name the driver here"
            name="driver"
            //   value={thoughtText}
            className="form-input col-12 col-md-9"
          ></input>
          </label>
        </div>
        <div>
          <label>Driver Email
          <input
            placeholder="email@example.com"
            name="email"
            value={driverEmail}
            onChange={handleEmailChange}
            className="form-input col-12 col-md-9"
          ></input>
          </label>
        </div>
        <div>
          <label>Pickup Address
          <textarea
            placeholder="1234 Example Road, Mystery Mississippi, 12345"
            name="pickup"
            value={pickUpAddress}
            onChange={handlePickupChange}
            className="form-input col-12 col-md-9"
          ></textarea>
          </label>
        </div>
        <div>
          <label>Delivery Address
          <textarea
            placeholder="1234 For Instance Ave, Curiosity Connecticut, 12345"
            name="deliver"
            value={deliveryAddress}
            onChange={handleDeliverChange}
            className="form-input col-12 col-md-9"
          ></textarea>
          </label>
        </div>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="h-75px text-[#991111] text-xl mt-8 text-center">
          <ul className="">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddJobForm;
