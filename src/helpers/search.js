import requests from "@/helpers/requests";

export function search(params) {
  return requests.get("/search/preSearch", {
    params: params
  });
}
