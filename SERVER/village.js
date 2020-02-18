var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var collectionName = common_data.table_name.villagenames;
var apiCalls = common_data.APICALLS;
var SORT = common_data.sortBy;
var API = common_data.APIS.VILLAGE;

router.post(API.GET.get, function (req, res, next) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.GET, collectionName, SORT.byVillageName)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post(API.POST.add, urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {

            res.send(result);
        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, SORT.byVillageName)
                .then((result1) => {
                    res.send(result1);
                });
        });
});
router.post(API.DELETE.delete, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, SORT.byVillageName)
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});
router.put(API.UPDATE.update, urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "village_name": req.body.village_name
        }
        , req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, SORT.byVillageName)
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router