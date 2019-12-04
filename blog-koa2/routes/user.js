const {loginCheck}= require('../controller/user')
const {successModel, errorModel} = require('../model/resModel')
const router = require('koa-router')()
router.prefix('/api/user')

// router.post('/login', async (ctx, next) => {
router.get('/login', async (ctx, next) => { 
    // const {username,password} = ctx.request.body
    const {username,password} = ctx.query
    const loginData = await loginCheck(username,password)
   
    if(loginData.username){
        ctx.session.username = loginData.username
        ctx.session.name = loginData.name
        ctx.body = new successModel({},'登录成功！')
    }else{
        ctx.body = new errorModel(null,'登录失败！')
    }


});

// router.get('/login-test', function(req, res, next) {
//     if(req.session.username){
//         res.json({
//             code:0,
//             msg:'成功',
//             data:req.session.username
//         })
//     }else{
//         res.json({
//             code:-1,
//             msg:'未登录'
//         })
//     }

// });

module.exports = router;
