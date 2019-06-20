const express = require("express");
const server = new express();
const globalConfig = require('./config');
const loader = require('./loader')

server.use(express.static(globalConfig['page_path']));

server.post("/editEveryDay", loader.get('/editEveryDay'))
server.get("/queryEveryDay", loader.get('/queryEveryDay'))

server.post("/editBlog", loader.get('/editBlog'))
server.get("/queryBlogByPage", loader.get('/queryBlogByPage'))
server.get("/queryBlogCount", loader.get('/queryBlogCount'))
server.get("/queryBlogDetailById", loader.get('/queryBlogDetailById'))

server.post("/addComment", loader.get('/addComment'))
server.get("/queryCommentByBid", loader.get('/queryCommentByBid'))
server.get("/queryRandomCode", loader.get('/queryRandomCode'))

server.get("/queryAllBlog", loader.get('/queryAllBlog'))
server.get("/queryRandomTags", loader.get('/queryRandomTags'))
server.get("/queryHotBlog", loader.get('/queryHotBlog'))
server.get("/queryNewComments", loader.get('/queryNewComments'))

server.get("/queryByTag", loader.get('/queryByTag'))
server.get("/queryByTagCount", loader.get('/queryByTagCount'))

server.listen(globalConfig['port'], () => {
    console.log("server runing at port " + globalConfig['port'])
})