// 导入express
const express = require('express');
const path = require('path');
var session = require('express-session')
// 创建app
const app = express();
// 引入第三方插件
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }))

// session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// 静态页面的引入
app.use(express.static(path.join(__dirname, "statics")))

// 判断用户有没有登录
app.all('*', (req, res, next) => {
    // 登录逻辑, 不需要限制
    if(req.url.includes('/account')) {
        next()
    }else {
        // 判断有没有登录, 没有就跳到登录页面
        if(!req.session.loginedName) {
            res.send('<script>alert("请先登录!"); location.href = "/account/login.html"</script>');
         
            return false;
        }

        next();
    }
})

// 登录注册
const accountRouter = require(path.join(__dirname, "./routers/accountRouter.js"));
// 登录注册路由模块
app.use('/account', accountRouter);
// 学生信息列表
const studentRouter = require(path.join(__dirname, "./routers/studentRouter.js"));
// 学生信息列表路由模块
app.use('/student', studentRouter);


app.listen(8081, (err) => {
    if(err) {
        console.log(err);
    }
    console.log('开启成功');
})