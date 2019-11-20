const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname,'data.txt')

//读取文件内容
fs.readFile(fileName,(e,d) => {
    if(e){
        console.log(e)
        return
    }
    //d返回为二进制类型，需要转换为字符串
    console.log(d.toString())
})

//写入文件
const con = '写入内容'
const opt = {
    flag:'a'    //追加写入 覆盖用 'w'
}

fs.writeFile(fileName,con,opt,(err) => {
    if(err){
        console.log(err)
    }
})

//判断文件是否存在

fs.exists(fileName,(exist) => {
   
        console.log(exist)
   
})
