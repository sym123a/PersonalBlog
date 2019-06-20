const url = require("url")
const commentDao = require('../dao/commentDao')
const timeUtil = require('../util/timeUtil')
const respUtil = require('../util/respUtil')
const captcha = require("svg-captcha")
let map = new Map()

function addComment(request, response) {
    const params = url.parse(request.url, true).query;
    console.log(params)
    commentDao.insertComment(params.bid, params.parent, params.parentName, params.userName, params.email, params.content,
        timeUtil.getNow(), timeUtil.getNow(),function (result) {
            // console.log(result)
            response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
            response.write(respUtil.writeResult('success', '评论成功', null))
            response.end()
        })
}
map.set('/addComment', addComment)

function queryRandomCode(request, response) {
    let img = captcha.create({fontSize: 50, width: 100, height: 34})
    // console.log(img)
    response.writeHead(200)
    response.write(respUtil.writeResult('success', '评论成功', img))
    response.end()
}
map.set('/queryRandomCode', queryRandomCode)


function queryCommentByBid(request, response) {
    const params = url.parse(request.url, true).query;

    commentDao.queryCommentByBid(params.bid,function (result) {
            // console.log(result)
            response.writeHead(200)
            response.write(respUtil.writeResult('success', '查询成功', result))
            response.end()
        })
}
map.set('/queryCommentByBid', queryCommentByBid)

function queryNewComments(request, response) {
    commentDao.queryNewComments(5,function (result) {
        response.writeHead(200)
        response.write(respUtil.writeResult('success', '查询成功', result))
        response.end()
    })
}
map.set('/queryNewComments', queryNewComments)

module.exports.path = map