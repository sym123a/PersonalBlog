const dbutil = require('./DBUtil')

function insertTag(tag, ctime, utime, success) {
    const insertSql = "insert into tags (tag, ctime, utime) values (?, ?, ?);";
    const params = [tag, ctime, utime];

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

function queryTag(tag, success) {
    const insertSql = "select * from tags where tag = ?;";
    const params = [tag];

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

function queryAllTag(success) {
    const insertSql = "select * from tags;";
    const params = [];

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

module.exports = {
    insertTag,
    queryTag,
    queryAllTag
}