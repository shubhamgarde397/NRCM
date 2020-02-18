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
var apiCalls = common_data.APICALLS;

router.post('/getBookingDetails/:name', urlencodedParser, function (req, res) {

    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, req.params.name, { 'Date': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getBookingDetailsDateWise/:name/:startdate/:enddate', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, req.params.name, { 'Date': 1 }, { 'Date': { $gte: req.params.startdate, $lte: req.params.enddate } })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getBookingDetailsTruckWiseCount/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, req.params.name, {}, { 'truckno': req.params.truckno })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/countTruckWiseParty/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'gstdetails')
        .then(function (GST) {
            countAll(GST, req.params.truckno, req.body.dbName)
                .then((result) => {
                    res.send(result);
                })
        })
        .catch((err) => {
            res.send(err);
        });
});

function countAll(GST, truckno, dbName) {
    var promise = new Promise((resolve, reject) => {
        var array = [];
        var obj = {};
        var length = Object.keys(GST).length;
        var terminateLength = 0;
        var resolveStatus = false;
        GST.forEach(element => {
            var nop = element.name;
            mongoFunctions.handleData(dbName, apiCalls.COUNT, element.name, {}, { 'truckno': truckno })
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

router.post('/getBookingDetailsAllTrucks/:name/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, req.params.name, {}, { 'truckno': req.params.truckno })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getBookingDetailsCount/:name', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.COUNT, req.params.name)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addbookingdata/:nop', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, req.params.nop, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addpartydata/:tab', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, req.params.tab, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/delBookingdetailsdata/:id/:nop', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, req.params.nop, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateBookingData/:nop', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, req.params.nop, {}, {},
        {
            "Date": req.body.Date,
            "nop": req.body.nop,
            "lrno": req.body.lrno,
            "truckno": req.body.truckno,
            "place": req.body.place,
            "hamt": req.body.hamt,
            "PaymentRecDate": req.body.PaymentRecDate,
            "Payment": req.body.Payment,
            "amt": req.body.amt,
            "FromParty": req.body.FromParty,
            "FromPartyGST": req.body.FromPartyGST,
            "ToPartyGST": req.body.ToPartyGST,
            "OwnerName": req.body.OwnerName,
            "PAN": req.body.PAN
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