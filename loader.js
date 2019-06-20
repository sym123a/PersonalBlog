const fs = require("fs");
const globalConfig = require('./config')

const dirFile = fs.readdirSync(globalConfig['web_path']);
let controllerSet = []
let map = new Map()

for(let i = 0; i < dirFile.length; i++){
    let file = require('./'+globalConfig['web_path'] + '/' + dirFile[i])
    if(file.path){
        for(let [key, value] of file.path) {
            if(!map.get(key)){
                map.set(key, value)
            }else{
                throw new Error('url path 异常， url: ' + key)
            }
        }
        controllerSet.push(file)
    }
}

// console.log(map)
module.exports = map
