const querystring = require('querystring')
const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')

//处理 postdata的数据
const getPostData = (req) => {
    const pormise = new Promise((resolve,reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers["content-type"] !== "application/json"){
            resolve({})
            return
        }
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',() => {
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        
        })
    })
    return pormise
}

const serverHandle = (req,res) => {
    res.setHeader('Content-type','application/json')
    //处理blog路由
    const url = req.url;
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    getPostData(req).then(postData => {
        req.body = postData
        // const blogData = blogRouter(req,res)
        // if(blogData){
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        const blogResult = blogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // const userData = userRouter(req,res)
        // if(userData){
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult = userRouter(req,res)
        if(userResult){
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
    
        res.writeHead(404,{"Content-type":"application/json"})
        res.write('404接口')
        res.end()
    })

}

module.exports = serverHandle