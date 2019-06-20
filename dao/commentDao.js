const dbutil = require('./DBUtil')

function insertComment(bid, parent, parentName, userName, email, content, ctime, utime, success) {
    const insertSql = "insert into comments(blog_id, parent, parent_name, user_name, email, content, ctime, utime) values (?, ?, ?, ?, ?, ?, ?, ?);";
    const params = [bid, parent, parentName, userName, email, content, ctime, utime];

    console.log(bid, parent, parentName, userName, email, content, ctime, utime)
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

function queryCommentByBid(bid, success) {
    const querySql = "select * from comments where blog_id = ?;";
    const params = [bid];

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

function queryNewComments(size, success){
    const querySql = "select * from comments order by id desc limit ?;";
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

module.exports =  {
    insertComment,
    queryCommentByBid,
    queryNewComments
}