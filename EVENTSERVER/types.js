var express = require('express')
var router = express.Router()
var common_data = require('../data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('../EVENTSERVER/mongoFunctions');

router.use(bodyParser.json());

router.get('/getType', function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'Type')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/subType', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'Type', {}, { Type: req.body.Type }, {}, {})
        .then((result) => {
            if ((result[0]._id === null) || (result[0]._id === undefined) || (result[0]._id === '')) { return; }
            else {
                const id = result[0]._id;
                var receivedData = mongoFunctions.handleData(0, 'Sub_Type', {}, { Type_id: id })
                    .then((result) => {

                        res.json(result)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router