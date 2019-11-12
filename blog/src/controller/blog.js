const {execSQL} = require('../db/mysql')

const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author="${author}" `
    }
    if(keyword){
        sql += `and title like "%${keyword}%" `
    }
    sql += `order by createtime desc;`
    return execSQL(sql)
}
const getDetails = (id) => {
    let sql = `select * from blogs where id="${id}";`
    return execSQL(sql).then(data =>{
        return data[0]
    })
}
const addBlog = (blogData = {}) => {
    let title = blogData.title,
        contnt = blogData.contnt,
        createtime = Date.now(),
        author = blogData.author;
    let sql = `insert into blogs(title,contnt,createtime,author) values ('${title}','${contnt}','${createtime}','${author}'); `
    return execSQL(sql).then(sqlBlogDate => {
        return {
            id:sqlBlogDate.insertId
        }
    })
}

const updateBlog = (id,blogData = {}) => {
    let title = blogData.title,
        contnt = blogData.contnt;
    let sql = `update blogs set title='${title}',contnt='${contnt}' where id=${id}; `
    return execSQL(sql).then(updateData => {

        if(updateData.affectedRows >0){
            return true

        }
        return false
    })
}
const deleteBlog = (id,author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'; `
    return execSQL(sql).then(delData => {
        if(delData.affectedRows >0){
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetails,
    addBlog,
    updateBlog,
    deleteBlog
}