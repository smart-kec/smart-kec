module.exports = (err, errors, collectionName) => {
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
  return errors;
};
