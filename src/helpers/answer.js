import requests from "@/helpers/requests";

export function getSomeAnswerNew(params) {
  return requests.get('/answer/getSomeAnswerNew', {
    params: params
  })
}


export function getAnswer(params) {
  return requests.get('/answer/getAnswer', {
    params: params
  })
}

export function newAnswer(data) {
  return requests.post('/answer/newAnswer', data)
}

export function evaluate(params) {
  return requests.get('/answer/evaluate', {
    params: params
  })

}