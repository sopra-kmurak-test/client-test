import requests from "./requests_utils";

export function getTotalPageCount() {
    return requests.get("/question/getTotalPageCount")
}

export function listQuestions(params) {
    return requests.get(`/question/getSomeQuestionNew`, {
        params: params//"pageIndex"="1",没有data
    });
}

export function getQuestion(params) {
    return requests.get(`/question/getQuestion`, {
        params: params
    });
}

export function evaluateQuestion(params) {
    return requests.get(`/question/evaluate`, {
        params: params
    })
}

export function newQuestion(data) {
    return requests.post(`/question/newQuestion?detail=${data.detail}&title=${data.title}`)
}

export function getQuestionsAskedBy(params) {
    return requests.get(`/question/getQuestionsAskedBy`, {
        params: params
    })
}

export function updateQuestion(data) {
    return requests.post(`/question/updateQuestion?editId=${data.editId}&newTitle=${data.newTitle}&detail=${data.detail}`)
}

export function deleteQuestion(data) {
    return requests.post(`/question/deleteQuestion?questionId=${data.questionId}`)
}