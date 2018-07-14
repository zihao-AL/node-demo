// 导入express
const express = require('express');
const path = require('path');

// 创建路由对象
const accountRouter = express.Router();
// 引入控制器
const accountCTRL = require(path.join(__dirname, "../controllers/accountController.js"));
// 登录页面
accountRouter.get('/login.html', accountCTRL.getLoginPage);
// 登录模块
accountRouter.post('/dologin', accountCTRL.doLoginPage);
// 注册模块
accountRouter.post('/doRegister', accountCTRL.doRegisterPage);
// 随机数图片模块
accountRouter.get('/vcode', accountCTRL.getImgPage);
// 退出登录模块
accountRouter.get('/logout', accountCTRL.logoutPage);

// 暴露出去
module.exports = accountRouter;
