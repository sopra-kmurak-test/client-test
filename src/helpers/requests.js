"use strict";
import axios from "axios";
import Cookies from "js-cookie";

const requests = axios.create({
  baseURL: process.env.API_HOST,
  withCredentials: true,
});

requests.interceptors.request.use(
  (config) => {
    config.headers["content-type"] = "multipart/form-data";
    config.headers['token'] = Cookies.get('token')
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

requests.interceptors.response.use(
  (response) => {
    const result = response.data;

    if (response.status === 401) {
      return Promise.reject(new Error(result.msg || "Login failed!"));
    }

    return result;
  },
  (error) => {
    console.log("error" + error);
    return Promise.reject(error);
  }
);

export default requests;
