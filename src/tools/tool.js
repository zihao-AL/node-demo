const path = require('path');
// 数据库
const MongoClient = require('mongodb').MongoClient;
// mongodb根据id操作数据要引入ObjectId才可以
const ObjectId = require('mongodb').ObjectId;
// 暴露出去
exports.ObjectId = ObjectId;
// 引入mongodb的断言
const assert = require('assert');
// Connection URL
const DBurl = 'mongodb://localhost:27017';
// Database Name
const dbname = 'test';


// 因为会重复使用, 所以封装起来
const getCollection = (collectionName, callback) => {

    MongoClient.connect(DBurl, {useNewUrlParser: true}, (err, client) => {
        // 断言 判断是否报错, 是就停止函数
        assert.equal(null, err);
        
        const db = client.db(dbname);
        // Get the documents collection 要连接的集合/表
        const collection = db.collection(collectionName);

        callback(client, collection);
    })

}

/**
 * 查询数据的封装...
 * 参数1: 要操作的数据库的集合(表)
 * 参数2: 要操作的内容
 * 参数3: 回调函数
 */
exports.find = (collectionName, params, callback) => {
    // 把外面一层的封装起来
    getCollection(collectionName, (client, collection) => {
        // 调用查询函数, 查询数据
        collection.find(params).toArray((err,docs) => {
            // 关闭连接数据库
            client.close();
            // 查询完毕之后, 通过回调函数把数据返回回去
            callback(err,docs)
        });
    })
}

/**
 * 查询一条数据的封装...
 * 参数1: 要操作的数据库的集合(表)
 * 参数2: 要操作的内容
 * 参数3: 回调函数
 */
exports.findOne = (collectionName, params, callback) => {
    // 把外面一层的封装起来
    getCollection(collectionName, (client, collection) => {
        // 调用查询函数, 查询数据
        collection.findOne(params, (err,doc) => {
            // 关闭连接数据库
            client.close();
            // 查询完毕之后, 通过回调函数把数据返回回去
            callback(err,doc);
        });
    })
}

/**
 * 插入一条数据的封装...
 * 参数1: 要操作的数据库的集合(表)
 * 参数2: 要操作的内容
 * 参数3: 回调函数
 */
exports.insertOne = (collectionName, params, callback) => {

    getCollection(collectionName, (client, collection) => {
        // 调用添加一条的函数
        collection.insertOne(params, (err, result) => {
            // 关闭连接数据库
            client.close();
            // 查询完毕之后, 通过回调函数把数据返回回去
            callback(err, result)
        });
    })
}

/**
 * 删除一条数据的封装...
 * 参数1: 要操作的数据库的集合(表)
 * 参数2: 要操作的内容
 * 参数3: 回调函数
 */
exports.deleteOne = (collectionName, params, callback) => {

    getCollection(collectionName, (client, collection) => {
        // 调用添加一条的函数
        collection.deleteOne(params, (err, result) => {
            // 关闭连接数据库
            client.close();
            // 查询完毕之后, 通过回调函数把数据返回回去
            callback(err, result)
        });
    })
}

/**
 * 修改一条数据的封装...
 * 参数1: 要操作的数据库的集合(表)
 * 参数2: 条件
 * 参数3: 要操作的内容
 * 参数4: 回调函数
 */
exports.updateOne = (collectionName, condition, params, callback) => {

    getCollection(collectionName, (client, collection) => {
        // 调用添加一条的函数
        collection.updateOne(condition, {$set: params}, (err, result) => {
            // 关闭连接数据库
            client.close();
            // 查询完毕之后, 通过回调函数把数据返回回去
            callback(err, result)
        });
    })
}