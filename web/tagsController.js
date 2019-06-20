const url = require("url")
const tagsDao = require("../dao/tagsDao")
const blogDao = require("../dao/blogDao")
const tagBlogMappingDao = require("../dao/tagBlogDaoMapping")

const timeUtil = require("../util/timeUtil")
const respUtil = require('../util/respUtil')
let map = new Map()

function queryRandomTags(request, response) {
    tagsDao.queryAllTag(function (res) {
        res.sort(function () {
            return Math.random()> 0.5 ? -1 :1;
        })
        // console.log(res);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", res))
        response.end()
    })
}
map.set('/queryRandomTags', queryRandomTags)

function queryByTag(request, response) {
    const params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryByTag(parseInt(params.tag), params.page, parseInt(params.pageSize), function (result) {
        let blogList = [];
        for(let i = 0; i < result.length; i++){
            blogDao.queryBlogById(result[i].blog_id, function (res) {
                blogList.push(res[0])
                if(i === result.length-1){
                    response.writeHead(200);
                    response.write(respUtil.writeResult("success", "查询成功", blogList))
                    response.end()
                }
            })
        }
    })
}
map.set('/queryByTag', queryByTag)

function queryByTagCount(request, response) {
    const params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryByTagCount(parseInt(params.tag), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
map.set('/queryByTagCount', queryByTagCount)

module.exports.path = map