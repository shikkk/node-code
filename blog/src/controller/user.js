
const {execSQL} = require('../db/mysql')

const loginCheck = (username,password) => {
    let sql = `select username,name from users where username='${username}' and password='${password}';`
    return execSQL(sql).then(data =>{
        console.log(data[0])
        return data[0]||{}
    })
}

module.exports = {
    loginCheck
}