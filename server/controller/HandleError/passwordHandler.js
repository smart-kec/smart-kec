module.exports = (err, errors, checkPassword, collectionName) => {
  //Password length
  if (err.message.includes("Password length")) {
    checkPassword.forEach((mes) => {
      errors.password += mes.message + ", ";
    });
    return errors;
  }

  //Duplicate key error
  if (err.code == 11000) {
    return {
      status: "failed",
      message: "Duplicates Values already available",
    };
  }
  //Validation Error
  if (err.message.includes(collectionName + " validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};
