import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    position: "driver",
    password: "",
    confirmPassword: "",
  });
  const [register, { error }] = useMutation(ADD_USER, { errorPolicy: "all" });
  const [errors, setErrors] = useState({});
  // submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // use try/catch instead of promises to handle errors
    try {
      const data = await register({
        variables: { ...formState },
      });
      if (data.errors) {
        setErrors(data.errors[0].extensions.errors);
      }
      Auth.login(data.data.register.token);
    } catch (e) {
      console.error(e);
    }
  };
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <main className="login-body">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="login-title">Sign Up</h4>
          <div className="card-body">
            <form className='login-form' onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <select
                name="position"
                type="position"
                className="form-input"
                id="position"
                value={formState.position}
                onChange={handleChange}
              >
                <option>driver</option>
                <option>dispatcher</option>
              </select>
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
              />
              <button className="button d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div className="error-text">Sign up failed</div>}
            {Object.keys(errors).length > 0 && (
              <div className="error-text">
                <ul className="">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Signup;