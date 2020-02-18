var express = require('express')
var router = express.Router()
var common_data = require('../data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('../EVENTSERVER/mongoFunctions');

router.use(bodyParser.json());


router.post('/getUserDp', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(4, 'displayPictures', {}, { email: req.body.email }, {}, {})
        .then((result) => {
            if (result === 1) {
                var receivedData = mongoFunctions.handleData(0, 'displayPictures', {}, { email: req.body.email }, {}, {})
                    .then((response) => {
                        res.json(response);
                    })
                    .catch((error) => {
                        res.json(error);
                    })
            } else {
                res.json({ status: 'DP ERROR' });
            }
        })
        .catch((err) => {
            res.send(err);
        });
});







module.exports = router