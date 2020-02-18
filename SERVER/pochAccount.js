var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var dbName = common_data.database.dbNameNRCM;
var collectionName = common_data.table_name.PochAccount;
var apiCalls = common_data.APICALLS;

router.post('/getPochDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/PochDetailsCount', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, {}, { "Check": false })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getPochDataTruckWiseDetails/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'truckno': req.params.truckno }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getPochDataDetailsTruckWiseByDateCount/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'truckno': req.params.truckno }, { "Check": false }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getPochDetailsByDate/:startdate/:enddate/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getPochByDateCount/:startdate/:enddate/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, { 'Date': 1 }, { $and: [{ 'nop': req.params.name }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } }, { "Check": false }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/getPochDataDetailsbyName/:name', urlencodedParser, function (req, res) {//this function
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { "Date": 1 }, { "nop": req.params.name })
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

router.post('/PochDetailsbyNameCount/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName, {}, { $and: [{ "nop": req.params.name }, { "Check": false }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getPochDataDetailsbyNameCheck/:name/:check', urlencodedParser, function (req, res) {//this function
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, { "Date": 1 }, { $and: [{ "nop": req.params.name }, { "Check": false }] })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addPochData', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/PochDetailsbyNameCountAll', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, collectionName)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/delPochdetailsdata/:id', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updatePochAccountdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            'Date': req.body.Date,
            'nop': req.body.nop,
            'truckno': req.body.truckno,
            'place': req.body.place,
            'amt': req.body.amt,
            'recDate': req.body.recDate,
            'Check': req.body.Check,
            'paymentMode': req.body.pmode,
            'tamt': req.body.tamt,
            'Comment': req.body.Comment
        },
        req.body.id)
        .then(function (result) {
            res.send(result);
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
                    balanceArray.push(element.amt);
                    element.balance = element.amt;
                }
                if (element.Check != false) {
                    balanceArray.push(0);
                    element.balance = 0;
                }
            }
            else {
                if (element.Check == false) {
                    var balA = String(parseInt(balanceArray[Object.keys(balanceArray).length - 1]) + parseInt(element.amt))
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

module.exports = router