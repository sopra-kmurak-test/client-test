import requests from "@/helpers/requests";

export function getTotalPageCount() {
  return requests.get('/question/getTotalPageCount')
}

export function listQuestions(params) {
  return requests.get("/question/getSomeQuestionNew", {
    params: params
  });
}

export function getQuestion(params) {
  return requests.get("/question/getQuestion", {
    params: params
  });
}

export function evaluateQuestion(params) {
  return requests.get('/question/evaluate', {
    params: params
  })
}

export function newQuestion(data) {
  return requests.post('/question/newQuestion', data)
}