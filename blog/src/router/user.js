
const {loginCheck}= require('../controller/user')
const {successModel, errorModel} = require('../model/resModel')

//设置cookie过期时间
const getCookieExpires = () => {
    let d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const userRouter = (req,res) => {
    const method = req.method;
    //登录
    if(method === 'GET' && req.path === '/api/user/login'){
        // const {username,password} = req.body
        const {username,password} = req.query
        const result = loginCheck(username,password)
        return result.then(loginData => {
            if(loginData.username){
                //httpOnly cookie 只允许后台修改cookie
                res.setHeader('Set-Cookie',`username=${loginData.username};path=/;httpOnly;expires=${getCookieExpires()}`)
                return new successModel({},'登录成功！')
             }else{
                 return new errorModel(null,'登录失败！')
             }
        })
    }
  
}

module.exports = userRouter