import Api from "./index";

export const getData = () => {
  return Api().get("posts");
};
