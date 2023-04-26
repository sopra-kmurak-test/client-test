import requests from "./requests_utils";

export function getSomeAnswerNew(params) {
    return requests.get(`/answer/getSomeAnswerNew`, {
        params: params
    })
}


export function getAnswer(params) {
    return requests.get(`/answer/getAnswer`, {
        params: params
    })
}

export function newAnswer(data) {
    return requests.post(`/answer/newAnswer?which_question=${data.which_question}&content=${data.content}`, {
        params: data
    })
    // return requests.post(`/answer/newAnswer?which_question=${data.which_question}&content=${data.content}`, data)
}

export function evaluate(params) {
    return requests.get(`/answer/evaluate`, {
        params: params
    })
}

export function getAnswersWriteBy(params) {
    return requests.get(`/answer/getAnswersWriteBy`, {
        params: params
    })
}

export function updateAnswer(data) {
    return requests.post(`/answer/updateAnswer?editId=${data.editId}&newContent=${data.newContent}`)
}

export function deleteAnswer(data) {
    return requests.post(`/answer/deleteAnswer?answerId=${data.answerId}`)
}