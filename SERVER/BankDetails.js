var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var collectionName = common_data.table_name.BankDetails;
var apiCalls = common_data.APICALLS;

router.post('/getBankDetailsbyid/:nameid', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { "Name": 1 }, { "Name": req.params.nameid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getUniqueBankDetailsbyid/:bankname/:name', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { "BankName": 1 }, { $and: [{ "BankName": req.params.bankname }, { "Name": req.params.name }] })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getBankDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'BankName': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addBankDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'BankName': 1 })
                .then((result1) => {
                    res.send(result1);
                });
        });
});

router.post('/deleteBankDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'BankName': 1 })
                .then((result1) => {
                    res.send(result1);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateBankDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            'Name': req.body.Name,
            'Accno': req.body.Accno,
            'BankName': req.body.BankName,
            'IFSC': req.body.IFSC
        },
        req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'BankName': 1 })
                .then((result1) => {
                    res.send(result1);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router