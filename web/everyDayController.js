const erverDayDao = require("../dao/everyDayDao")
const timeUtil = require("../util/timeUtil")
const respUtil = require('../util/respUtil')

let map = new Map()

function editEveryDay(request, response) {
    request.on('data', function (data) {
        // console.log( timeUtil.getNow() );
        erverDayDao.insertEveryDay(data.toString(), timeUtil.getNow(), function (result) {
            response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end()
        })
    })
}
map.set('/editEveryDay', editEveryDay)

function queryEveryDay(request, response) {
    erverDayDao.queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result[0]))
        response.end()
    })
}
map.set('/queryEveryDay', queryEveryDay)


module.exports.path = map