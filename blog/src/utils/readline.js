const fs = require('fs')
const path = require('path')
const readline = require('readline')//readline node日志分析工具
//文件名
const fileName = path.join(__dirname,'../','../','logs','access.log')

//创建read stream
const readStream = fs.createReadStream(fileName)

//创建readline 对象

const readLineoObj = readline.createInterface({
    input:readStream
})

let chromeNum = 0
let num = 0

//逐行读取   line一行数据读完就会触发函数
readLineoObj.on('line', (lineDate) => {
    if(!lineDate){
        return
    }
    num++
    const arr = lineDate.split(' -- ')
    console.log(arr)
    if(arr[1] && arr[1].indexOf('Chrome') > 0){
        chromeNum ++
    }
})

//监听读取完成
readLineoObj.on('close', (lineDate) => {
    console.log(`Chrome占比：${chromeNum/num}`)
})




