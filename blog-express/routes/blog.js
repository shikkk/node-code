const {getList,getDetails,addBlog,updateBlog,deleteBlog} = require('../controller/blog')
const {successModel, errorModel} = require('../model/resModel')
var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck');


router.get('/list', function(req, res, next) {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const mySqlData = getList(author,keyword)
    return mySqlData.then(listData => {
        res.json(
            new successModel(listData)
        ) 
    })

});

router.get('/detail', function(req, res, next) {
    const result = getDetails(req.query.id)
    return result.then(detail => {
        res.json(
            new successModel(detail)
        ) 
    })
});

router.post('/add',loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = addBlog(req.body)
    return result.then(data => {
        res.json(new successModel(data))
    })
});

router.post('/update',loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id,req.body)
    return result.then(data => {
        if(data){
            res.json(new successModel())
        }else{
            res.json(new errorModel(null,'更新博客失败！'))
        }
    })
});

router.post('/delete',loginCheck, (req, res, next) => {
    let author = req.session.username
    const result = deleteBlog(req.query.id,author)
    return result.then(data => {
        if(data){
            res.json(new successModel())
        }else{
            res.json(new errorModel(null,'删除博客失败！'))
        }
    })
});
module.exports = router;
