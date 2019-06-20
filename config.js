let fs = require("fs")

let globalConfig = {}

let file = fs.readFileSync('./server.conf')
let configArr = file.toString().split('\r\n')

for (let i = 0; i < configArr.length; i++){
    if(configArr[i]){
        let item = configArr[i].split("=");
        globalConfig[item[0]] = item[1]
    }
}
// console.log(globalConfig);
module.exports = globalConfig