import Api from "./index";

export const getData = () => {
  return Api().get("admin/department/get/all/");
};

export const generateAndSendEmailOtp = (credentials) => {
  console.log(credentials);

  return Api().put("signup/student/email/generate/otp", credentials);
};

export const checkOtpExpiry = (credentials) => {
  return Api().get("signup/student/check/otp/valid", { params: credentials });
};

export const verifyOtp = (credentials) => {
  return Api().post("signup/student/otp/verify", credentials);
};

export const getBranchListForSignup = (credentials) => {
  console.log("API", credentials.programme);
  return Api().post("signup/student/new/branch", credentials);
};

export const getSemListForSignup = (credentials) => {
  console.log("API data", credentials.deptID);
  return Api().post("signup/student/new/semCount", credentials);
};

export const sendStudentDetailsSignup = (credentials) => {
  console.log("API Data Signup", credentials);
  return Api().post("signup/student/new/details", credentials);
};
