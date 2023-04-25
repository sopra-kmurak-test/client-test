import requests from "./requests_utils";

export function getSomeAnswerNew(params) {
    return requests.get(`/answer/getSomeAnswerNew?which_question=${params.which_question}&content=${params.content}`, {
        params: params
    })
}


export function getAnswer(params) {
    return requests.get(`/answer/getAnswer?answerId=${params.answerId}`, {
        params: params
    })
}

export function newAnswer(data) {
    return requests.post(`/answer/newAnswer?which_question=${data.which_question}&content=${data.content}`, data)
}

export function evaluate(params) {
    return requests.get(`/answer/evaluate?answerId=${params.answerId}&likeOrDislike=${params.likeOrDislike}`, {
        params: params
    })
}

export function getAnswersWriteBy(params) {
    return requests.get(`/answer/getAnswersWriteBy?authorId=${params.authorId}`, {
        params: params
    })
}

export function updateAnswer(data) {
    return requests.post(`/answer/updateAnswer?editId=${data.editId}&newContent=${data.newContent}`, data)
}

export function deleteAnswer(data) {
    return requests.post(`/answer/deleteAnswer?answerId=${data.answerId}`, data)
}