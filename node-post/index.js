const http = require('http');
const querystring = require('querystring')

const server = http.createServer((req,res)=> {
    const method = req.method;
    const url = req.url;
    const path = url.split('？')[0]
    const query = querystring.parse(url.split('？')[1])

    //设置返回格式为JSON

    res.setHeader('Content-type','application/json')

    const resData = {
        method, 
        url,
        path,
        query
    }

    if(req.method === 'GET'){
       
        res.end(JSON.stringify(resData))
    }
    if(req.method === 'POST'){
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',() => {
            res.end(resData.postData = postData)
        })
    }
})

server.listen(3002)
console.log('server is ok')