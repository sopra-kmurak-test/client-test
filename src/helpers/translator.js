import requests from "@/utils/requests";

export function translate(data) {
  return requests.post("/translator/", data);
}
