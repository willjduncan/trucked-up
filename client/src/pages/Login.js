import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER, { errorPolicy: "all" });
  const [errors, setErrors] = useState({});

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login({
        variables: { ...formState },
      });

      if (data.errors) {
        setErrors(data.errors[0].extensions.errors);
        console.log(errors);
      }

      Auth.login(data.data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="login-body">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="login-title">Login</h4>
          <div className="card-body">
            <form className='login-form' onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="button" type="submit">
                Submit
              </button>
            </form>
            {error && <div className="error-text">Login failed</div>}
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

export default Login;
