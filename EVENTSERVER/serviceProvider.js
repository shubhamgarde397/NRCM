var express = require('express')
var router = express.Router()
var common_data = require('../data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('../EVENTSERVER/mongoFunctions');

router.use(bodyParser.json());

router.get('/getData', function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'serviceProviderData', {}, {})
        .then(function (result) {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post('/userData', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'serviceProviderData', {}, { email: req.body.email }, {}, {})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addUser', function (req, res) {
    var c = mongoFunctions.handleData(4, 'serviceProviderData', {}, { email: req.body.email })
        .then(function (result) {
            if (result >= 1) {
                return 'User Exist';
            } else {
                var receivedData = mongoFunctions.handleData(1, 'serviceProviderData', {}, {}, req.body)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        res.send(err);
                    })
            }
        }).catch((err) => {
            return err;
        })

});


router.put('/updateUser', function (req, res) {
    var receivedData = mongoFunctions.handleData(3, 'serviceProviderData', {}, {},
        {
            "type": req.body.type,
            "name_of_the_hall": req.body.name_of_the_hall,
            "name_of_the_owner": req.body.name_of_the_owner,
            "email": req.body.email,
            "contact": req.body.contact,
            "address": req.body.address,
            "location": req.body.location,
            "capacity": req.body.capacity,
            "amenities": req.body.amenities,
            "cost": req.body.cost,
            "subtype": req.body.subtype
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