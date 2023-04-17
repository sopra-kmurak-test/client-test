import requests from "@/helpers/requests";

export function getTopComments(params) {
  return requests.get('/comment/getTopComments', {
    params: params
  })
}


export function insertComment(data) {
  return requests.post('/comment/insertComment', data)
}