const {getList,getDetails,addBlog,updateBlog,deleteBlog} = require('../controller/blog')
const {successModel, errorModel} = require('../model/resModel')

//验证是否登录
const checkLoginBlog = (req) => {
    if(!req.session.username){
        return Promise.resolve(new errorModel('登录失败'))
    }
}

const blogRouter = (req,res) => {
    const method = req.method;
    const id = req.query.id 
    //获取博客列表

    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const mySqlData = getList(author,keyword)
        return mySqlData.then(listData => {
            return new successModel(listData)
        })
        
    }
   //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const result = getDetails(id)
        return result.then(detail => {
            return new successModel(detail)
        })
    }

     //新建博客
     if(method === 'POST' && req.path === '/api/blog/add'){
        let checkLogin = checkLoginBlog(req)
        if(checkLogin){
            return checkLoginBlog
        }
        req.body.author = req.session.username
        const result = addBlog(req.body)
        return result.then(data => {
            return new successModel(data)
        })

    }
    //更新博客
    if(method === 'POST' && req.path === '/api/blog/update'){
        let checkLogin = checkLoginBlog(req)
        if(checkLogin){
            return checkLoginBlog
        }
        const result = updateBlog(id,req.body)
        return result.then(data => {
            if(data){
                return new successModel()
            }else{
                return new errorModel(null,'更新博客失败！')
            }
        })
    }

     //删除博客
     if(method === 'POST' && req.path === '/api/blog/delete'){
        let checkLogin = checkLoginBlog(req)
        if(checkLogin){
            return checkLoginBlog
        }
         let author = req.session.username
        const result = deleteBlog(id,author)
        return result.then(data => {
            if(data){
                return new successModel()
            }else{
                return new errorModel(null,'删除博客失败！')
            }
        })
    }
}

module.exports = blogRouter