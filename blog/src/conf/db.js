const env = process.env.NODE_ENV

let mysqlConf
let redisConf

if(env === 'dev'){
    mysqlConf = {
        host     : 'localhost',
        user     : 'root',
        password : '12345678',
        port     : '3306',
        database : 'myblog'
    }
    redisConf = {
        port : 6739,
        host : '127.0.0.1'
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
    redisConf = {
        port : 6739,
        host : '127.0.0.1'
    }
}

module.exports = {
    mysqlConf,
    redisConf
}