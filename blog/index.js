const querystring = require('querystring')
const { set, get } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')


//设置cookie过期时间
const getCookieExpires = () => {
    let d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
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
    //写入日志
    access(`${req.method}-- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} ` )
    res.setHeader('Content-type','application/json')
    //处理blog路由
    const url = req.url;
    req.path = url.split('?')[0]
    //获取get参数
    req.query = querystring.parse(url.split('?')[1])
    //获取cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(element => {
        if(!element){
            return
        }
        let arr = element.split('=')
        let key = arr[0].trim()
        let value = arr[1].trim()
        req.cookie[key] = value
    });
    let userId = req.cookie.userid
    let needSetCookie = false
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId,{})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData == null){
            set(req.sessionId,{})
            req.session = {}
        }else{
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        const blogResult = blogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCookie){
                    //httpOnly cookie 只允许后台修改cookie
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        const userResult = userRouter(req,res)
        if(userResult){
            userResult.then(userData => {
                if(needSetCookie){
                    //httpOnly cookie 只允许后台修改cookie
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
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