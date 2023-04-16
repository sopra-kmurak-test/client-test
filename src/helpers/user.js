import requests from "@/utils/requests";

export function register(data) {
  return requests.post("/usr/register", data);
}

export function login(data) {
  return requests.post("/usr/login", data);
}
