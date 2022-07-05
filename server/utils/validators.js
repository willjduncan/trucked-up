module.exports.validateRegisterInput = (
  username,
  email,
  position,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please add a username.";
  }
  if (email.trim() === "") {
    errors.username = "Please add an email.";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please enter a valid email address.";
    }
  }
  if (position.trim() === "") {
    errors.position = "Please enter your position.";
  }
  if (password === "") {
    errors.password = "Please enter a valid password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Please add a email.";
  }
  if (password === "") {
    errors.password = "Password must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCliant = (name) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Please add a name.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateProjectAddition = (driverEmail,
  clientName,
  jobName,
  description,
  pickUpAddress,
  deliveryAddress) => {
  const errors = {};

  if (driverEmail.trim() === "") {
    errors.driverEmail = "Please add a driver's email.";
  }
  if (clientName.trim() === "") {
    errors.clientName = "Please add a clients name.";
  }
  if (jobName.trim() === "") {
    errors.jobName = "Please add a job name.";
  }
  if (description.trim() === "") {
    errors.description = "Please add a description.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}
