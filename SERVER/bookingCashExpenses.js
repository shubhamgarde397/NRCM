// db.GardeBCE.group({ key: { "truckNo": 1 }, reduce: function (curr, result) { }, initial: {} });

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
var apiCalls = common_data.APICALLS;

router.post('/getbookingCashExpenses/:nop', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, req.params.nop, { 'date': 1 })
        .then(function (result) {
            balanceChecker(result)
                .then((resultFinal) => {
                    // result['balance'] = resultFinal
                    res.send(result);
                })

        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/countbookingCashExpenses/:nop', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, req.params.nop, { 'date': 1 })
        .then(function (result) {
            getOnlyTruck(result)
                .then((resultFinal) => {
                    res.send([{ count: resultFinal }]);
                })
        })
        .catch((err) => {
            res.send(err);
        });
});

function getOnlyTruck(data) {
    var promise = new Promise((resolve, reject) => {
        var count = 0;
        data.forEach(element => {
            if (element.truckNo != null) {
                count = count + 1;
            }
        });
        resolve(count);
    });
    return promise;
}

function balanceChecker(value) {
    var balanceArrayLength = Object.keys(value).length;
    var balanceArray = [];
    var promise = new Promise((resolve, reject) => {
        value.forEach((element) => {
            if (Object.keys(balanceArray).length == 0) {
                if (element.Payment == null) {
                    balanceArray.push(element.hireAmount);
                    element.balance = element.hireAmount;
                }
                if (element.Payment != null) {
                    balanceArray.push(-element.Payment);
                    element.balance = element.hireAmount;
                }
            }
            else {
                if (element.Payment == null) {
                    var balA = String(parseInt(balanceArray[Object.keys(balanceArray).length - 1]) + parseInt(element.hireAmount))
                    balanceArray.push(balA);
                    element.balance = balA;
                }
                if (element.Payment != null) {
                    var balP = String(parseInt(balanceArray[Object.keys(balanceArray).length - 1]) - parseInt(element.Payment));
                    balanceArray.push(balP);
                    element.balance = balP;
                }
            }
        });
        resolve(balanceArray);
    });
    return promise;
}

router.post('/addbookingCashExpenses/:nop', urlencodedParser, function (req, res) {

    var receivedData = mongoFunctions.handleData(apiCalls.POST, req.params.nop, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });

});

router.post('/deletebookingCashExpenses/:id/:nop', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, req.params.nop, {}, {}, {}, req.params.id)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updatebookingCashExpenses', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, req.body.nop + 'BCE', {}, {},
        {
            "date": req.body.date,
            "truckNo": req.body.truckNo,
            "lrno": req.body.lrno,
            "place": req.body.place,
            "hireAmount": req.body.hireAmount,
            "Payment": req.body.Payment
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