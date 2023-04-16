import requests from "@/utils/requests";

export function search(params) {
  return requests.get("/search/preSearch", {
    params: params
  });
}
