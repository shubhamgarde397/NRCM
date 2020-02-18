var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var collectionName = common_data.table_name.AdvanceAccount;
var apiCalls = common_data.APICALLS;

router.post('/getAdvanceDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/AdvanceDataDetailsCount', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, {}, { "Check": false })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getAdvanceDataTruckWiseDetails/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'truckno': req.params.truckno }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getAdvanceDataDetailsTruckWiseByDateCount/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'truckno': req.params.truckno }, { "Check": false }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getAdvanceDetailsByDate/:startdate/:enddate/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getAdvanceByDateCount/:startdate/:enddate/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } }, { "Check": false }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getAdvanceDataDetailsbyName/:name', urlencodedParser, function (req, res) {//this function
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 }, { "nop": req.params.name })
        .then((result) => {
            balanceChecker(result)
                .then((resultFinal) => {
                    res.send(result);
                })
        })
        .catch((err) => {
            res.send(err);
        });
});

function balanceChecker(value) {
    var balanceArrayLength = Object.keys(value).length;
    var balanceArray = [];
    var promise = new Promise((resolve, reject) => {
        value.forEach((element) => {
            if (Object.keys(balanceArray).length == 0) {
                if (element.Check == false) {
                    balanceArray.push(element.adv);
                    element.balance = element.adv;
                }
                if (element.Check != false) {
                    balanceArray.push(0);
                    element.balance = 0;
                }
            }
            else {
                if (element.Check == false) {
                    var balA = String(parseInt(balanceArray[Object.keys(balanceArray).length - 1]) + parseInt(element.adv))
                    console.log(balA);
                    balanceArray.push(balA);
                    element.balance = balA;
                }
                if (element.Check != false) {
                    var balP = String(parseInt(balanceArray[Object.keys(balanceArray).length - 1]));
                    balanceArray.push(balP);
                    element.balance = balP;
                }
            }
        });
        resolve(balanceArray);
    });
    return promise;
}

router.post('/AdvanceDataDetailsbyNameCount/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, {}, { $and: [{ "nop": req.params.name }, { "Check": false }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addAdvanceData', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/AdvanceDataDetailsCountAll', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/delAdvancedetailsdata/:id', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});
router.use(bodyParser.json());
router.put('/updateAdvanceAccountdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            'Date': req.body.Date,
            'nop': req.body.nop,
            'truckno': req.body.truckno,
            'place': req.body.place,
            'hamt': req.body.hamt,
            'adv': req.body.adv,
            'recDate': req.body.recDate,
            'Check': req.body.Check,
            'paymentMode': req.body.pmode,
            'tamt': req.body.tamt
        },
        req.body.id)
        .then(function (result) {
            console.log(result);
            console.log('RUpdated');
            res.send(result);
        })
        .catch((err) => {
            console.log('RNot Updated');
            res.send(err);
        });
});

module.exports = router