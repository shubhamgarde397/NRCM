var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var dbName = common_data.database.dbNameInformation;
var collectionName = common_data.table_name.ownerdetails;
var apiCalls = common_data.APICALLS;

router.get('/LRCountAll', function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName, apiCalls.COUNT, 'LRDetails')
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getOwnerDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'truckno': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getOwnerDetailsbyid/:trucknoid', function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, {}, { "truckno": req.params.trucknoid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addownerdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'ownerdetails', { truckno: 1 })
                .then((result1) => {
                    res.send(result1);
                });
        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'ownerdetails', { truckno: 1 })
                .then((result1) => {
                    res.send(result1);
                });
        });
});

router.post('/deleteownerdetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'ownerdetails', { truckno: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateownerdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "truckno": req.body.truckno,
            "oname": req.body.oname,
            "pan": req.body.pan,
            "mobileno": req.body.mobileno
        },
        req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, { truckno: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router