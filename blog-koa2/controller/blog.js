const {execSQL} = require('../db/mysql')
const xss = require('xss')

const getList = async (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author="${author}" `
    }
    if(keyword){
        sql += `and title like "%${keyword}%" `
    }
    sql += `order by createtime desc;`
    return await execSQL(sql)
}
const getDetails = async (id) => {
    let sql = `select * from blogs where id="${id}";`
    const data = await execSQL(sql)
    return data[0]
}
const addBlog = async (blogData = {}) => {
    let title = xss(blogData.title) ,
        contnt = xss(blogData.contnt),
        createtime = Date.now(),
        author = blogData.author;
    let sql = `insert into blogs(title,contnt,createtime,author) values ('${title}','${contnt}','${createtime}','${author}'); `
    const sqlBlogDate = await execSQL(sql)
    return {
        id:sqlBlogDate.insertId
    }
   
}

const updateBlog = async (id,blogData = {}) => {
    let title = xss(blogData.title),
        contnt = xss(blogData.contnt);
    let sql = `update blogs set title='${title}',contnt='${contnt}' where id=${id}; `
    const updateData = await execSQL(sql)
    if(updateData.affectedRows >0){
        return true
    }
    return false
}
const deleteBlog = async (id,author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'; `
    const delData = await execSQL(sql)
   
    if(delData.affectedRows >0){
        return true
    }
    return false

}
module.exports = {
    getList,
    getDetails,
    addBlog,
    updateBlog,
    deleteBlog
}