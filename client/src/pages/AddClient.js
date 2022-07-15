import React, { useState, useRef } from "react";
import { ADD_CLIENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const AddClient = () => {
    const nameRef = useRef(null);
  const [formState, setFormState] = useState({ name: "" });
  const [addClient] = useMutation(ADD_CLIENT, { errorPolicy: "all" });
  const [errors, setErrors] = useState({});

  const handleFormSubmition = async (event) => {
    event.preventDefault();
    try {
      const response = await addClient({
        variables: {
          name: formState.name,
        },
      });
      if (response.errors) {
        setErrors(response.errors[0].extensions.errors);
        return
      }

      event.target.reset();
      clearForm()
      window.location.replace("/")
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function clearForm() {
    setFormState({name: ""})
  }

  return (
    <div className="clientContain">
      <form className="clientForm" onSubmit={handleFormSubmition}>
        <input
        ref={nameRef}
          className="clientInput"
          type="text"
          name="name"
          placeholder="Client Name"
          onChange={handleChange}
        />
        <div>
          <button className="button clientSubmit" type="submit">Submit</button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="">
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

export default AddClient;
