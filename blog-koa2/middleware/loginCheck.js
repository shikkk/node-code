const {errorModel} = require('../model/resModel')

module.exports = async (ctx, next) =>{
    if(ctx.session.username){
        await next()
        return
    }
    ctx.body = new errorModel(null,'未登录')
}