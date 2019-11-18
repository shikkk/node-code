
const {loginCheck}= require('../controller/user')
const {successModel, errorModel} = require('../model/resModel')
const {set, get} = require('../db/redis')


const userRouter = (req,res) => {
    const method = req.method;
    //登录
    if(method === 'POST' && req.path === '/api/user/login'){
        const {username,password} = req.body
        // const {username,password} = req.query
        const result = loginCheck(username,password)
        return result.then(loginData => {
            if(loginData.username){
                req.session.username = loginData.username
                req.session.name = loginData.name
                set(req.sessionId,req.session)
                return new successModel({},'登录成功！')
             }else{
                 return new errorModel(null,'登录失败！')
             }
        })
    }
  
}

module.exports = userRouter