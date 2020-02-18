var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var mongodb = require(common_data.required.mongodb);
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
const url = common_data.required.url;
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getTableName(tablename) {
    var promise = new Promise((resolve, reject) => {
        tablename = tablename.replace(/ /g, "_");
        resolve(tablename);
    });
    return promise;
}

function getCount(collectionName, dbName) {
    var promise = new Promise((resolve, reject) => {
        var arr = [];
        var resultarr = [];
        mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-01-.*/ })
            .then(function (result) {
                resultarr[0] = {
                    'monthname': 'January',
                    'count': result
                }
                mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-02-.*/ })
                    .then(function (result) {
                        resultarr[1] = {
                            'monthname': 'February',
                            'count': result
                        }
                        mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-03-.*/ })
                            .then(function (result) {
                                resultarr[2] = {
                                    'monthname': 'March',
                                    'count': result
                                }
                                mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-04-.*/ })
                                    .then(function (result) {
                                        resultarr[3] = {
                                            'monthname': 'April',
                                            'count': result
                                        }
                                        mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-05-.*/ })
                                            .then(function (result) {
                                                resultarr[4] = {
                                                    'monthname': 'May',
                                                    'count': result
                                                }
                                                mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-06-.*/ })
                                                    .then(function (result) {
                                                        resultarr[5] = {
                                                            'monthname': 'June',
                                                            'count': result
                                                        }
                                                        mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-07-.*/ })
                                                            .then(function (result) {
                                                                resultarr[6] = {
                                                                    'monthname': 'July',
                                                                    'count': result
                                                                }
                                                                mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-08-.*/ })
                                                                    .then(function (result) {
                                                                        resultarr[7] = {
                                                                            'monthname': 'August',
                                                                            'count': result
                                                                        }
                                                                        mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-09-.*/ })
                                                                            .then(function (result) {
                                                                                resultarr[8] = {
                                                                                    'monthname': 'September',
                                                                                    'count': result
                                                                                }
                                                                                mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-10-.*/ })
                                                                                    .then(function (result) {
                                                                                        resultarr[9] = {
                                                                                            'monthname': 'October',
                                                                                            'count': result
                                                                                        }
                                                                                        mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-11-.*/ })
                                                                                            .then(function (result) {
                                                                                                resultarr[10] = {
                                                                                                    'monthname': 'November',
                                                                                                    'count': result
                                                                                                }
                                                                                                mongoFunctions.handleData(dbName, 4, collectionName, {}, { 'Date': /.*-12-.*/ })
                                                                                                    .then(function (result) {
                                                                                                        resultarr[11] = {
                                                                                                            'monthname': 'December',
                                                                                                            'count': result
                                                                                                        }
                                                                                                        resolve(resultarr);
                                                                                                    });
                                                                                            });
                                                                                    });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
    return promise;

}

router.post('/getCountDateWise/:tablename', urlencodedParser, function (req, res) {
    getTableName(req.params.tablename)
        .then((collectionName) => {
            var receivedData = getCount(collectionName, req.body.dbName)
                .then(function (result) {
                    res.send(result);
                })
                .catch((err) => {
                    res.send(err);
                });
        })


});

module.exports = router