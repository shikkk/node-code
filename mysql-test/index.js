var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  port     : '3306',
  database : 'myblog'
});
//开始连接
connection.connect();
//执行sql语句
const sql = 'select * from users'

connection.query(sql, function (error, results) {
    if(error){
        console.log(error)
        return
    }
    console.log(results)
  });

//关闭连接
connection.end();
