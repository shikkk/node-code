const mysql  = require('mysql');
const { mysqlConf } = require('../conf/db');

const connection = mysql.createConnection(mysqlConf);
  //开始连接
connection.connect();

//执行sql函数
function execSQL(sql){
    const promise = new Promise((resolve,reject) => {
        connection.query(sql, function (error, results) {
            if(error){
                reject(error)
                return
            }
            resolve(results)
          });
    })
    return promise
}
  
module.exports = {
    execSQL
}