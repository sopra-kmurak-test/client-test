import requests from "./requests_utils";

export function getTotalPageCount() {
    return requests.get("/question/getTotalPageCount")
}

export function listQuestions(params) {
    return requests.get(`/question/getSomeQuestionNew?pageIndex=${params.pageIndex}`, {
        params: params//"pageIndex"="1",没有data
    });
}

export function getQuestion(params) {
    return requests.get(`/question/getQuestion?questionId=${params.questionId}`, {
        params: params
    });
}

export function evaluateQuestion(params) {
    return requests.get(`/question/evaluate?questionId=${params.questionId}&likeOrDislike=${params.likeOrDislike}`, {
        params: params
    })
}

export function newQuestion(data) {
    return requests.post(`/question/newQuestion?title=${data.title}&detail=${data.detail}`, data)
}

export function getQuestionsAskedBy(params) {
    return requests.get(`/question/getQuestionsAskedBy?authorId=${params.authorId}`, {
        params: params
    })
}

export function updateQuestion(data) {
    return requests.post(`/question/updateQuestion?editId=${data.editId}&newTitle=${data.newTitle}&detail=${data.detail}`, data)
}

export function deleteQuestion(data) {
    return requests.post(`/question/deleteQuestion?questionId=${data.questionId}`, data)
}