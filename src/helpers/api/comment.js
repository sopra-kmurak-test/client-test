import requests from "./requests_utils";

export function getTopComments(params) {
    return requests.get(`/comment/getTopComments?to_comment=${params.to_comment}&to_comment_type=${params.to_comment_type}`, {
        params: params
    })
}


export function insertComment(data) {
    return requests.post(`/comment/insertComment?to_comment=${data.to_comment}&to_comment_type=${data.to_comment_type}&content=${data.content}`, data)
}

export function getCommentsBy(params) {
    return requests.get(`/comment/getCommentsBy?commentator=${params.commentator}`, {
        params: params
    })
}

export function updateComment(data) {
    return requests.post(`/comment/update?commentId=${data.commentId}&content=${data.content}`, data)
}

export function deleteComment(data) {
    return requests.post(`/comment/delete?commentId=${data.commentId}`, data)
}