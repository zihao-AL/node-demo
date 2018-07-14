const path = require('path');
const xtpl = require('xtpl');
// 引入mongodb封装查询函数
// const databasetool = require(path.join(__dirname, "../tools/tool.js"));
// 封装好了, 上传到npmjs上面的
const databasetool = require('purple-tools');

// 引入学生信息列表页面
exports.getStudentListPage = (req, res) => {

    const keyword = req.query.keyword || "";

    databasetool.find('studentInfo', {name: {$regex: keyword}}, (err,docs) => {
        // 返回页面
        xtpl.renderFile(path.join(__dirname, "../views/list.html"), {studentList: docs, keyword, loginedName: req.session.loginedName}, (err, content) => {
            res.send(content);
        })
    })


}
// 新增学生页面
exports.addStudentPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../views/add.html"), {loginedName: req.session.loginedName}, (err, content) => {
        if(err) {
            console.log(err);
            return false;
        }
        res.send(content);
    })
}

// 新增学生信息函数
exports.doAddStudentPage = (req, res) => {

    databasetool.insertOne('studentInfo', req.body, (err, result) => {
        if(result != null) {
            res.send('<script>location.href = "/student/list.html"</script>');
        }else {
            res.send({message: '添加失败'});
        }
    })
}

// 删除学生信息函数
exports.delPage = (req, res) => {
    // 拿到url传输的id
    const _id = databasetool.ObjectId(req.params.studentId);

    databasetool.deleteOne('studentInfo', {_id}, (err, result) => {
        // 根据id删除一条信息
        if(result != null) {
            res.send('<script>location.href = "/student/list.html"</script>');
        }else {
            res.send({message: '删除失败'});
        }
    })
}

// 修改学生信息页面
exports.updatePage = (req, res) => {
    const _id = databasetool.ObjectId(req.params.studentId);

    databasetool.findOne('studentInfo', {_id}, (err, doc) => {
        // 返回页面
        xtpl.renderFile(path.join(__dirname, "../views/edit.html"), {studentInfo: doc, loginedName: req.session.loginedName}, (err, content) => {
            res.send(content);
        })
    })
}
// 修改学生信息函数
exports.editStudentPage = (req, res) => {
    const _id = databasetool.ObjectId(req.params.studentId);

    databasetool.updateOne('studentInfo', {_id}, req.body, (err, result) => {
        // 根据id修改一条信息
        if(result != null) {
            res.send('<script>location.href = "/student/list.html"</script>');
        }else {
            res.send({message: '修改失败'});
        }
    })
}
