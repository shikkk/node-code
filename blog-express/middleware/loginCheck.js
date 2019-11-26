const {errorModel} = require('../model/resModel')

module.exports = (req, res, next) =>{
    if(req.session.username){
        next()
        return
    }
    res.json(
        new errorModel(null,'未登录')
    )
}