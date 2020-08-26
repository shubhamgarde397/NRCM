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
var dbName = common_data.database.dbNameNRCM;
var collectionName = common_data.table_name.LRDetails;
var collectionNameNot = common_data.table_name.LRDetailsNot;
var apiCalls = common_data.APICALLS;

router.post('/getLRDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'lrno': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addLRDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getLRDetailsNot', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionNameNot, { 'lrno': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/pushLRDetailsNot', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionNameNot, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/LRCountAll', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.COUNT, collectionName)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/LRDetailsFalseCount', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.COUNT, collectionName, {}, { 'Check': false })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/deleteLRDetails/:id', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateLRDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            "date": req.body.date,
            "lrno": req.body.lrno,
            "nameOfParty": req.body.nameOfParty,
            "truckNo": req.body.truckNo,
            "place": req.body.place,
            'recDate': req.body.recDate,
            'Check': req.body.Check
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