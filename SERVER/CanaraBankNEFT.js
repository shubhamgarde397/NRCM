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
date = new Date();
var dbName = common_data.database.dbNameNRCM;
var collectionName = common_data.table_name.CanaraBankNEFT;
var apiCalls = common_data.APICALLS;

router.post('/getCanBankNEFTDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'accDate': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getCanBankNEFTDetailsByID/:id', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'accDate': 1 }, { 'accType': req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/getCanBankNEFTDetailsByDate/:date', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'accDate': 1 }, { 'accDate': req.params.date })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getCanBankNEFTDetailsToday', urlencodedParser, function (req, res) {
    var today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'accDate': 1 }, { 'accDate': today })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getCanBankNEFTDetailsByTruck/:trucknopart', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'accDate': 1 }, { 'truckNo': req.params.trucknopart })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/getCanBankNEFTDetailsByTruckNo/:date/:truckNo', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'accDate': 1 }, { $and: [{ 'accDate': req.params.date }, { 'truckNo': req.params.truckNo }] })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/getCanBankNEFTTrucks', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DISTINCT, 'TruckBankDetails', { 'truckno': 1 }, {}, {}, {}, 'truckno')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addCanBankNEFTDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/delCanBankNEFTDetails/:id', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateCanBankNEFTDetails', urlencodedParser, function (req, res) {

    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "accType": req.body.accType,
            "accDate": req.body.accDate,
            "truckNo": req.body.truckNo,
            "name": req.body.name,
            "bankName": req.body.bankName,
            "IFSC": req.body.IFSC,
            "accno": req.body.accno,
            "amt": req.body.amt,
            "summary": req.body.summary,
            "transferType": req.body.transferType,
            "paymentDate": req.body.paymentDate,
            "mobileNo": req.body.mobileNo
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