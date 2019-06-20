const dbutil = require('./DBUtil')

function insertTagBlogMapping(tagId, blogID, ctime, utime, success) {
    const insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?);";
    const params = [tagId, blogID, ctime, utime];

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

function queryByTag(tagId, page, pageSize, success) {
    const querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?;";
    const params = [tagId,  page * pageSize, pageSize];

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

function queryByTagCount(tagId, success) {
    const querySql = "SELECT count(1) as count FROM tag_blog_mapping where tag_id = ?;";
    const params = [tagId];

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

module.exports = {
    insertTagBlogMapping,
    queryByTag,
    queryByTagCount
}