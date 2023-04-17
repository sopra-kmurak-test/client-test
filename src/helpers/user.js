import requests from "@/helpers/requests";

export function register(data) {
  return requests.post("/user/register", data);
}

export function login(data) {
  return requests.post("/user/login", data);
}
