
const {execSQL,escape} = require('../db/mysql')

const loginCheck = async (username,password) => {
    username = escape(username)
    password = escape(password)
    let sql = `select username,name from users where username=${username} and password=${password};`

    const data = await execSQL(sql)
    return data[0]||{}
}

module.exports = {
    loginCheck
}