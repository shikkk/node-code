const fs = require('fs')
const path = require('path')

//__dirname 当前文件目录  /Users/shizhikai/Documents/demo/node-code/promise-test

function getFileContent(fileName){
    const promise = new Promise((resolve,reject) => {
        const allFileName = path.resolve(__dirname,'file',fileName)
        fs.readFile(allFileName,(err,data) => {
            if(err){
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}
// promise 获取内容
// getFileContent('a.json').then(adata => {
//     console.log('a',adata.next)
//     return getFileContent(adata.next)
// }).then(bdata => {
//     console.log('b',bdata.next)
//     return getFileContent(bdata.next)
// }).then(cdata => {
//     console.log('c',cdata.next)
// })

// async/await  获取内容
// 1、await 后面可以追加promise对象，获取resolve的值
// 2、await 必须包裹在async函数里
// 3、async函数执行返回的也是一个promise对象
// 4、try-catch截获promise中reject的值
async function readFileData(){
    try {
        const a = await getFileContent('a.json')
        console.log(a)
        const b = await getFileContent(a.next)
        console.log(b)
        const c = await getFileContent(b.next)
        console.log(c)
    } catch (error) {
        console.log(error)
    }
}
readFileData()
