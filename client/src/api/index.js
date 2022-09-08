import axios from "axios";

export default () => {
  return axios.create({
    // baseURL: `https://smart-kec.herokuapp.com/`,
    baseURL: `http://localhost:8000/`,
  });
};
