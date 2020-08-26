var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
date = new Date();
var collectionName = common_data.table_name.dailydata;
var apiCalls = common_data.APICALLS;

router.post('/getDailyDataDetailsByDateCount/:startdate/:enddate/:name', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.COUNT, collectionName, { 'Date': 1 }, { $and: [{ 'nofp': req.params.name }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataDetailsTruckWiseByDateCount/:name/:truckno', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.COUNT, collectionName, { 'Date': 1 }, { $and: [{ 'nofp': req.params.name }, { 'TruckNo': req.params.truckno }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataTruckWiseDetails/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'Date': 1 }, { $and: [{ 'nofp': req.params.name }, { 'TruckNo': req.params.truckno }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'Date': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataDetailsName/:name', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'Date': 1 }, { "nofp": req.params.name })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataDetailsbyid/:id', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { "_id": new mongodb.ObjectID(req.params.id) })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/countTruckWiseParty/:truckno', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, 'regularparty')
        .then(function (Party) {
            countAll(Party, req.params.truckno, req.body.dbName)
                .then((result) => {
                    res.send(result);
                })
        })
        .catch((err) => {
            res.send(err);
        });
});

function countAll(Party, truckno, dbName) {
    var promise = new Promise((resolve, reject) => {
        var array = [];
        var obj = {};
        var length = Object.keys(Party).length;
        var terminateLength = 0;
        var resolveStatus = false;
        Party.forEach(element => {
            var nop = element.name;
            mongoFunctions.handleData(dbName, apiCalls.COUNT, collectionName, {}, { $and: [{ 'TruckNo': truckno }, { 'nofp': nop }] })
                .then((resultCount) => {
                    obj['name'] = nop;
                    obj['count'] = resultCount;
                    array.push(obj);
                    obj = {};
                    terminateLength = terminateLength + 1;
                    if (terminateLength == length) {
                        resolve(array);
                    }
                });
        });
    });
    return promise;
}

router.post('/getDailyDetailsAllTrucks/:name/:truckno', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { $and: [{ 'nofp': req.params.name }, { 'TruckNo': req.params.truckno }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/adddailydata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/dailyDataCountAll', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.COUNT, collectionName)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/delDailydata/:id', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataDetailsByDate/:startdate/:enddate/:name', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'Date': 1 }, { $and: [{ 'nofp': req.params.name }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } }] })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getDailyDataDetailsToday', function (req, res) {

    var today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'Date': 1 }, { 'Date': today })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateDailyDataDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "Date": req.body.Date,
            "nofp": req.body.nofp,
            "TruckNo": req.body.TruckNo,
            "Dest": req.body.Dest,
            "hamt": req.body.hamt,
            "advamt": req.body.advamt
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