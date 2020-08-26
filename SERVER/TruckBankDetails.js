var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var collectionName = common_data.table_name.TruckBankDetails;
var apiCalls = common_data.APICALLS;
var SORT = common_data.sortBy;

router.post('/getTruckBankDetailsbyid/:trucknoid', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { "truckno": req.params.trucknoid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});



router.post('/getTruckBankDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, SORT.byTruckNo, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/getTruckBankDetailsbyName', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, SORT.byAccountName, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addtruckbankdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/deleteTruckBankdetails/:id', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateTruckBankdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            "truckno": req.body.truckno,
            "accountname": req.body.accountname,
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