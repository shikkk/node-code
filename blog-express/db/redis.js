const redis = require('redis')
const { redisConf } = require('../conf/db');
// 6379,'127.0.0.1'
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err => {
    console.log(err)
})

module.exports = redisClient