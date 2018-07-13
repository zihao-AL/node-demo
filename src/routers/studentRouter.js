const express = require('express');
const path = require('path');

// 创建路由
const studentRouter = express.Router();

// 引入控制器
const studentCTRL = require(path.join(__dirname, "../controllers/studentController.js"))
// 获取学生信息列表
studentRouter.get('/list.html', studentCTRL.getStudentListPage);


// 暴露出去
module.exports = studentRouter;
