const router = require('koa-router')()
router.prefix('/api/blog')
const {getList,getDetails,addBlog,updateBlog,deleteBlog} = require('../controller/blog')
const {successModel, errorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck');

router.get('/list', async (ctx, next) => {
    const author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    const listData = await getList(author,keyword)
    ctx.body = new successModel(listData)

})

router.get('/detail', async (ctx, next) => {
  const detail = await getDetails(ctx.query.id)
  ctx.body = new successModel(detail)
});

router.post('/add',loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username
    const data = await addBlog(ctx.request.body)
    ctx.body = new successModel(data)
});

router.post('/update',loginCheck, async (ctx, next) => {
    const data = await updateBlog(ctx.query.id,ctx.request.body)
    if(data){
      ctx.body = new successModel()
    }else{
      ctx.body = new errorModel(null,'更新博客失败！')
    }

});
router.post('/delete',loginCheck,async (ctx, next) => {
    let author = ctx.session.username
    const data = await deleteBlog(ctx.query.id,author)
    if(data){
      ctx.body = new successModel()
    }else{
      ctx.body = new errorModel(null,'删除博客失败！')
    }

});

module.exports = router
