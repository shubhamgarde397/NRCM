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
var collectionName = common_data.table_name.gstdetails;
var apiCalls = common_data.APICALLS;
var SORT = common_data.sortBy;
var API = common_data.APIS.GST;

router.post(API.GET.getBasic, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, SORT.byName)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post(API.GET.getByIdDest, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, {}, { "name": req.params.nopid, "dest": req.params.nopiddest })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post(API.GET.getCount, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, req.params.tab)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post(API.GET.getById, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, {}, { "_id": new mongodb.ObjectID(req.params.id) })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post(API.POST.add, urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'gstdetails', { name: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post(API.DELETE.delete, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'gstdetails', { name: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put(API.UPDATE.update, urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "name": req.body.name,
            "gst": req.body.gst,
            "dest": req.body.dest
        },
        req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'gstdetails', { name: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});


module.exports = router