const {loginCheck}= require('../controller/user')
const {successModel, errorModel} = require('../model/resModel')
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    // const {username,password} = req.body
    const {username,password} = req.query
    const result = loginCheck(username,password)
    return result.then(loginData => {
        if(loginData.username){
            req.session.username = loginData.username
            req.session.name = loginData.name
            res.json(
                new successModel({},'登录成功！')
            ) 
        }else{
            res.json(
                new errorModel(null,'登录失败！')
            )     
        }
    })

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
