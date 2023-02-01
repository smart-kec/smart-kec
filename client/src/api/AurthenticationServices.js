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
  return Api().get("signup/student/new/branch", credentials);
};
