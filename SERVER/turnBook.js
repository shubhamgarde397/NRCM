var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
var mongodb = require(common_data.required.mongodb);
router.use(bodyParser.json());
var dbName = common_data.database.dbNameInformation;
var tableArray = common_data.tables;
commonObjectSend = {};
var collectionName = common_data.table_name.turnBook;
var apiCalls = common_data.APICALLS;
var SORT = common_data.sortBy;
var API = common_data.APIS.GST;
date = new Date();

router.post('/getturnbookdata', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { 'date': req.body.today })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addturnbookdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result1) {
            res.send(result1)
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/delturnbookdata', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result1) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateturnbookdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            "date": req.body.date,
            "truckNo": req.body.truckNo,
            "hireAmount": req.body.hireAmount,
            "place": req.body.place,
            "partyName": req.body.partyName,
            "check": req.body.check
        },
        req.body.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


module.exports = router