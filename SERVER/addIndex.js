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
var collectionName = common_data.table_name.gstdetails;
var apiCalls = common_data.APICALLS;

router.post('/createIndex', function (req, res) {
    var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, 'gstdetails')
        .then(function (result) {
            result.forEach(element => {
                mongoFunctions.handleData(req.body.dbName, apiCalls.INDEX, element.name)
                    .then(function (result) {
                        res.send({ status: 'Done Indexing' });
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router