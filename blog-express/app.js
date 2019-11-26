var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // cookie插件
var logger = require('morgan');   // 日志插件
const session = require('express-session')
const redisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置redis
const redisClient = require('./db/redis')
const sessionStore = new redisStore({
  client:redisClient
})
//配置session
app.use(session({
  secret:'#ZKs_8675#',
  resave: false,           //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  cookie:{
    path:'/',               //默认配置
    httpOnly:true,          //默认配置
    maxAge:24*60*60*1000    //24小时后失效
  },
  store:sessionStore   // session 存到redis里
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
