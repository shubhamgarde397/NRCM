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
var collectionName = common_data.table_name.impgstdetails;
var apiCalls = common_data.APICALLS;

router.post('/getImpGSTDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'name': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getImpGSTDetailsbyid/:nopid/:nopiddest', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { "name": req.params.nopid, "dest": req.params.nopiddest })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getImpGSTDetailsbyid/:id', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { "_id": new mongodb.ObjectID(req.params.id) })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addimpgstdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'name': 1 })
                .then((result1) => {
                    res.send(result1);
                });
        });
});

router.post('/delImpgstdetailsdata', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'name': 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateImpgstdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            "name": req.body.name,
            "gst": req.body.gst,
            "dest": req.body.dest
        },
        req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'name': 1 })
                .then((result) => {
                    console.log(result);
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router
