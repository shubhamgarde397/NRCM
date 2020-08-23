var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var apiCalls = common_data.APICALLS;

router.post('/getFinolexDetails/:tab', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, req.params.tab, { 'Date': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getFinolexDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, 'Pipe', { 'Date': 1 }, { 'Date': { $gte: req.body.Date + '-01', $lte: req.body.Date + '-31' } }, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getFinolexDetailsAllTrucks/:tab/:truckno', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, req.params.tab, { 'Date': 1 }, { 'truckno': req.params.truckno })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getFinolexDetailsPartyWise/:tab/:partyname', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, req.params.tab, { 'Date': 1 }, { 'nop': req.params.partyname })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/delFinolexdetailsdata/:id/:data', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, req.params.data, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updatefinolexdetailsdata/:data', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, req.params.data, {}, {},
        {
            "Date": req.body.ndate,
            "lrno": req.body.lrno,
            "nop": req.body.nop,
            "FromParty": req.body.nfromparty,
            "FromPartyGST": req.body.nfrompartygst,
            "ToPartyGST": req.body.ntopartygst,
            "truckno": req.body.ntruckno,
            "hamt": req.body.hamt,
            "place": req.body.place,
            "Payment": req.body.Payment,
            "PaymentRecDate": req.body.PaymentRecDate,
            "amt": req.body.amt,
            "OwnerName": req.body.ownername,
            "PAN": req.body.pan
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