module.exports = (err, errors) => {
  //Duplicate key error
  if (err.code == 11000) {
    return {
      status: "failed",
      message: "Duplicates Values already available",
    };
  }

  //Not found
  if (err.message.includes("Cast to ObjectId failed")) {
    return {
      status: "failed",
      message: "Details not found to update",
    };
  }

  //Validation Error
  if (err.message.includes("Validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};
