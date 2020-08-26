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
var dbName=common_data.database.dbNameNRCM;
var collectionName = common_data.table_name.CanaraBankPayment;

router.get('/getModal', function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName,0, 'Test')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/putModal', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName,3, 'Test', {}, {},
        {
            data: req.body.newData
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