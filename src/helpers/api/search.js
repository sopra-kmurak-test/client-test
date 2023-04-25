import requests from "./requests_utils";

export function search(params) {
    return requests.get(`/search/preSearch?q=${params.q}`, {
        params: params
    });
}
