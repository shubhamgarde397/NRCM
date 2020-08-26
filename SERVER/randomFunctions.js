/***
 * 0.GET
 * 1.POST
 * 2.DELETE_BY__ID
 * 3.UPDATE
 * 4.COUNT
 * 5.COUNT-ADVANCED
 * 6.DELETE_BY_SOMETHING_ELSE
 */


var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var mongodb = require(common_data.required.mongodb);
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
const url = common_data.required.url;
const dbName = common_data.database.dbname;
app.use(bodyParser.urlencoded({ extended: true }));

function getTableName(tablename) {
    var promise = new Promise((resolve, reject) => {
        tablename = tablename.replace(/ /g, "_");
        tablename = tablename + "BCE";
        resolve(tablename);
    });
    return promise;
}

module.exports = {
    handleData: function (collectionName) {

        getTableName(collectionName)
            .then((tableName) => { });
    }
}