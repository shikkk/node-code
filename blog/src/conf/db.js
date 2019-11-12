const env = process.env.NODE_ENV

let mysqlConf

if(env === 'dev'){
    mysqlConf = {
        host     : 'localhost',
        user     : 'root',
        password : '12345678',
        port     : '3306',
        database : 'myblog'
    }

}
if(env === 'production'){
    mysqlConf = {
        host     : 'localhost',
        user     : 'root',
        password : '12345678',
        port     : '3306',
        database : 'myblog'
    }
}

module.exports = {
    mysqlConf
}