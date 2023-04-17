import requests from "@/helpers/requests";

export function translate(data) {
  return requests.post("/translator/", data);
}
