var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var collectionName = common_data.table_name.driverdetails;
var apiCalls = common_data.APICALLS;

router.post('/getDriverDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'truckno': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/adddriverdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, { 'truckno': 1 })
                .then((result1) => {
                    res.send(result1);
                });
        });
});

router.post('/deletedriverdetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, { 'truckno': 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updatedriverdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "truckno": req.body.truckno, "dname": req.body.dname, "mobileno": req.body.mobileno
        },
        req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, { 'truckno': 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router