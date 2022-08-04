module.exports.handleAccountError = (err, checkPassword) => {
  let errors = { status: "failed", email: "", password: "", type: "" };
  // console.log(err);

  //Password length
  if (err.message.includes("Password length")) {
    console.log(checkPassword);
    checkPassword.forEach((mes) => {
      errors.password += mes.message + ", ";
    });
    return errors;
  }

  //Duplicate key error
  if (err.code == 11000) {
    errors.email = "This email id is already registered...";
    return errors;
  }

  //Validation Error
  if (err.message.includes("accounts validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.handleStudentError = (err) => {
  let errors = {
    status: "failed",
    name: "",
    rollNo: "",
    programme: "",
    branch: "",
    yearOfStudy: "",
    graduationYear: "",
    email: "",
    phoneNumber: "",
    hackerRankId: "",
  };
  // console.log(err);

  //Duplicate key error
  if (err.code == 11000) {
    return {
      status: "failed",
      message: "Duplicates Values already available",
    };
  }
  //Validation Error
  if (err.message.includes("studentinfo validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};

module.exports.handleOTPError = (err) => {
  let errors = {
    status: "failed",
    email: "",
    otp: "",
  };
  // console.log(err);

  //Duplicate key error
  if (err.code == 11000) {
    return {
      status: "failed",
      message: "Duplicates Values already available",
    };
  }
  //Validation Error
  if (err.message.includes("otpdetails validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};
