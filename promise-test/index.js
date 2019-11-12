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

getFileContent('a.json').then(adata => {
    console.log('a',adata.next)
    return getFileContent(adata.next)
}).then(bdata => {
    console.log('b',bdata.next)
    return getFileContent(bdata.next)
}).then(cdata => {
    console.log('c',cdata.next)
})
