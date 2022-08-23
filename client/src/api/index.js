import axios from "axios";

export default () => {
  return axios.create({
    // baseURL: `https://dummyjson.com/`,
    baseURL: `http://localhost:6000/`,
  });
};
