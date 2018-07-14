// 引入path模块
const path = require('path');
// 数据库
const databasetool = require(path.join(__dirname, "../tools/tool.js"));

// 引入随机数字图片
const captchapng = require('captchapng');
// 登录页面
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"))
}
// 随机数图片的代码
exports.getImgPage = (req, res) => {
    // 随机生成一个4位数
    const random = parseInt(Math.random()*9000+1000);
    req.session.vcode = random;
    
    // 调用插件, 生成随机数
    let p = new captchapng(80,30,random); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second colo    r: paint (red, green, blue, alpha)

    let img = p.getBase64();
    let imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);

}
// 登录函数
exports.doLoginPage = (req, res) => {
    // 拿到用户名和密码
    const {username, password} = req.body;
    if(req.body.vcode != req.session.vcode) {
        res.send({ message: '验证码错误' })
        return false;
    }

    databasetool.findOne('user', {username, password}, (err, doc) => {
        if(doc != null) {
            req.session.loginedName = username
            res.status(200).send({ message: '登录成功' })
        }else {
            res.status(200).send({ message: '登录失败' })
        }
    })
}

// 注册函数
exports.doRegisterPage = (req, res) => {
    // 拿到用户名和密码
    const {username, password} = req.body; 

    if(req.body.vcode != req.session.vcode) {
        res.status(200).send({ message: '验证码错误' })
        return false;
    }
    // 判断用户名是否存在
    databasetool.findOne('user', {username}, (err, doc) => {
        if(doc != null) {
            res.status(200).send({ message: '用户名已存在' })
            return;
        }else {
            // 执行新增函数
            databasetool.insertOne('user', {username, password}, (err, result) => {
                if(result != null) {            
                   res.send({ message: '注册成功' })
                }else {  
                  res.send({ message: '注册成功' })
                }
            }) 
        }
    }) 
}

// 退出登录函数
exports.logoutPage = (req, res) => {
    // 清空登录凭证
    req.session.loginedName = null;
    // 跳转到登录页面
    res.send('<script>location.href = "/account/login.html"</script>')
}