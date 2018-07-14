const express = require('express');
const path = require('path');

// 创建路由
const studentRouter = express.Router();

// 引入控制器
const studentCTRL = require(path.join(__dirname, "../controllers/studentController.js"))

// 获取学生信息列表
studentRouter.get('/list.html', studentCTRL.getStudentListPage);

// 获取新增学生信息页面
studentRouter.get('/add.html', studentCTRL.addStudentPage);

// 新增学生信息函数
studentRouter.post('/doAdd', studentCTRL.doAddStudentPage);

// 删除学生信息函数
studentRouter.get('/del/:studentId', studentCTRL.delPage);

// 获取修改学生信息页面
studentRouter.get('/edit/:studentId', studentCTRL.updatePage);

// 修改学生信息函数
studentRouter.post('/edit/:studentId', studentCTRL.editStudentPage);


// 暴露出去
module.exports = studentRouter; 
