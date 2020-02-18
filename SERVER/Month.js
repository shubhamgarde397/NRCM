var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var collectionName = common_data.table_name.months;
var apiCalls = common_data.APICALLS


router.put('/updateMonth', urlencodedParser, function (req, res) {
    var changeValue = 1;
    if (req.body.status === 1) {
        console.log('came here coz of 1')
        changeValue = 0;
    } else {
        console.log('came here coz of 0')
        changeValue = 1;
    }
    console.log(changeValue);
    var receivedData = mongoFunctions.handleData(req.body.dbName, apiCalls.UPDATE, collectionName, {}, {},
        {
            "monthName": req.body.monthName,
            "status": changeValue
        }
        , req.body._id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName)
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router