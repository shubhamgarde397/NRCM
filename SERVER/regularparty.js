var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var dbName = common_data.database.dbNameInformation;
var collectionName = common_data.table_name.regularparty;
var apiCalls = common_data.APICALLS;

router.post('/getRegularPartyData', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'name': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addregularpartydata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result1) {

        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { name: 1 })
                .then((result1) => {
                    res.send(result1);
                });
        });
});

router.post('/deleteregulardatadetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { name: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateregularparty', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {}, { "name": req.body.name }, req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { name: 1 })
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