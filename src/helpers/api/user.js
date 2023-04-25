import requests from "./requests_utils";

export function register(data) {
    const url = `/usr/register?email=${data.email}&password=${data.password}&username=${data.username}`;
    return requests.post(url);
    // return requests.post("/usr/register", data);
    // return requests.post("/usr/register", {
    //     params: data
    // });
}

export function login(data) {
    const url = `/usr/login?password=${data.password}&username=${data.username}`;
    return requests.post(url);
    // return requests.post("/usr/login", {
    //     params: data
    // });
    // return requests.post("/usr/login", data);
}

export function getHasNew() {
    return requests.get("/usr/has_new");
}

export function cleanHasNew() {
    return requests.post("/usr/has_new");
}