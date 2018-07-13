// 引入path模块
const path = require('path');
// 数据库
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// 数据库的路径
const DBurl = "mongodb://localhost:27017";
// 连接的数据库名称
const dbname = "test";

// 引入随机数字图片
let captchapng = require('captchapng');
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
    // console.log(req.session.vcode);
    // 拿到用户名和密码
    const userInfo = req.body;
    if(userInfo.vcode != req.session.vcode) {
        res.send({ message: '验证码错误' })
        return false;
    }

    MongoClient.connect(DBurl, {useNewUrlParser: true}, (err, client) => {
        // 断言 判断是否报错, 是就停止函数
        assert.equal(null, err);
        //console.log('连接成功');

        const db = client.db(dbname);
        // Get the documents collection 要连接的集合/表
        const collection = db.collection('user');

        // 查询一条数据
        collection.findOne({username: userInfo.username, password: userInfo.password}, function(err, doc) {
            // console.log(doc);
            if(doc != null) {
                res.status(200).send({ message: '登录成功' })
            }else {
                console.log('登录失败');
                res.status(200).send({ message: '登录失败' })
            }
        });

        // 关闭连接数据库
        client.close();
    })






    
}

// 注册函数
exports.doRegisterPage = (req, res) => {
    // 拿到用户名和密码
    const userInfo = req.body;
    if(userInfo.vcode != req.session.vcode) {
        res.send({ message: '验证码错误' })
        return false;
    }

    MongoClient.connect(DBurl, {useNewUrlParser: true}, (err, client) => {
        // 断言 判断是否报错, 是就停止函数
        assert.equal(null, err);
        //console.log('连接成功');
        const db = client.db(dbname);
        // Get the documents collection 要连接的集合/表
        const collection = db.collection('user');

        // 查询一条数据
        collection.findOne({username: userInfo.username}, function(err, doc) {
            // console.log(doc);
            if(doc != null) {
                res.send({ message: '用户名已存在' })
                return false;
            }
        });
        // 执行添加函数 增加一条
        collection.insertOne({username: userInfo.username, password: userInfo.password}, function(error, result) {
            
            if(result.result.n == 1) {
                res.status(200).send({ message: '注册成功' })
            }else {  
                res.send({ message: '注册失败' })
            }
        });

        

        // 关闭连接数据库
        client.close();
    })






    
}