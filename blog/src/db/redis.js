const redis = require('redis')
const { redisConf } = require('../conf/db');

console.log(redisConf.port,redisConf.host)
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err => {
    console.log(err)
})

const set = (key,val) =>{
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

const get = (key) =>{
    const promise = new Promise((resolve,reject) =>{
        redisClient.get(key, (err,value) => {
            if(err){
                reject(err)
                return
            }
            if(value == null){
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(value))
            } catch (error) {
                resolve(value)
            }
        })
    })
    return promise
}
set('zk', {})
module.exports = {
    set,
    get
}