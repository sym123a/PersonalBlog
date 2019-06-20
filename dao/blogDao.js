const dbutil = require('./DBUtil')

function queryBlogCount(success) {
    const querySql = "SELECT count(1) as count FROM blog;";
    const params = [];

    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end();
}

function insertBlog(title, content, views, tags, ctime, utime, success) {
    const insertSql = "insert into blog(title, content, views, tags, ctime, utime) values (?, ?, ?, ?, ?, ?);";
    const params = [title, content, views, tags, ctime, utime];

    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end();
}

function queryBlogByPage(page, pageSize, success) {
    const querySql = "SELECT * FROM blog order by id desc limit ?,?;";
    const params = [page * pageSize, pageSize];

    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end();
}

function queryBlogDetailById(blogId, success) {
    const querySql = "select * from blog where id = ?;";
    const params = [blogId]

    const connection = dbutil.createConnection()
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function queryAllBlog(success){
    const querySql = "select * from blog";
    const params = []

    const connection = dbutil.createConnection()
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function addViews(id, success){
    const querySql = "update blog set views = views + 1 where id = ?;";
    const params = [id]

    const connection = dbutil.createConnection()
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function queryHotBlog(size, success){
    const querySql = "select * from blog order by views desc limit ?;";
    const params = [size]

    const connection = dbutil.createConnection()
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function queryBlogById(id, success){
    const querySql = "select * from blog where id = ?;";
    const params = [id]

    const connection = dbutil.createConnection()
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error === null){
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

module.exports =  {
    queryBlogCount,
    insertBlog,
    queryBlogByPage,
    queryBlogDetailById,
    queryAllBlog,
    addViews,
    queryHotBlog,
    queryBlogById
}