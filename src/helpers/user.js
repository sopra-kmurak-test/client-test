import requests from "@/helpers/requests";

export function register(data) {
  return requests.post("/register", data);
}

export function login(data) {
  return requests.post("/login", data);
}
