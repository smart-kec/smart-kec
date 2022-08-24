import Api from "./index";

export const getData = () => {
  return Api().get("admin/department/get/all/");
};

export const generateAndSendEmailOtp = (credentials) => {
  return Api().put("signup/student/email/generate/otp", credentials);
};
