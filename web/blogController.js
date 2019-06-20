const url = require("url")
const blogDao = require("../dao/blogDao")
const tagsDao = require("../dao/tagsDao")
const tagBlogMappingDao = require("../dao/tagBlogDaoMapping")

const timeUtil = require("../util/timeUtil")
const respUtil = require('../util/respUtil')

let map = new Map()

function  queryBlogDetailById(request, response) {
    const params = url.parse(request.url, true).query
    blogDao.queryBlogDetailById(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
        blogDao.addViews(params.bid, function (res) {})
    })
}
map.set("/queryBlogDetailById", queryBlogDetailById)

function queryBlogCount(request, response){
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
map.set('/queryBlogCount', queryBlogCount)

function queryBlogByPage(request, response) {
    const params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        // console.log(result)
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
map.set('/queryBlogByPage', queryBlogByPage)

function editBlog(request, response) {
    const params = url.parse(request.url, true).query;
    const tags = params.tags.replace(/ /g, "").replace(", ", ",");
    // console.log( tags);
    request.on('data', function (data) {
        blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end()
            const blogId = result.insertId;
            const tagList = tags.split(",")
            for (let i = 0; i < tagList.length; i++){
                if(tagList[i] === ''){
                    continue;
                }
                queryTag(tagList[i], blogId)
            }
        })
    })
}
map.set('/editBlog', editBlog)

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if(result === null || result.length === 0){
            inserTag(tag, blogId)
        }else{
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

function inserTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (response) {
        // console
    })
}

function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
map.set('/queryAllBlog', queryAllBlog)

function queryHotBlog(request, response) {
    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
map.set('/queryHotBlog', queryHotBlog)

module.exports.path = map