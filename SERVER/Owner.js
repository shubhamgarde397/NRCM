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
var collectionName = common_data.table_name.ownerdetails;
var apiCalls = common_data.APICALLS;
var readline = require('readline');
var fs = require('fs');
router.put('/updatelambda', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            "lambda": req.body.lambda,
            "truckno": req.body.truckno,
            "oname": req.body.oname,
            "pan": req.body.pan,
            "mobileno": req.body.mobileno
        },
        req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { truckno: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/LRCountAll', function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName, apiCalls.COUNT, 'LRDetails')
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getOwnerDetails', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { 'truckno': 1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getOwnerDetailsbyid/:trucknoid', function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, {}, { "truckno": req.params.trucknoid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addownerdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, 'ownerdetails', { truckno: 1 })
                .then((result1) => {
                    res.send(result1);
                });
        })
        .catch((err) => {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, 'ownerdetails', { truckno: 1 })
                .then((result1) => {
                    res.send(result1);
                });
        });
});

router.post('/deleteownerdetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.DELETE, collectionName, {}, {}, {}, req.body.id)
        .then(function (result) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, 'ownerdetails', { truckno: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/updateownerdetailsdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(apiCalls.UPDATE, collectionName, {}, {},
        {
            "truckno": req.body.truckno,
            "oname": req.body.oname,
            "pan": req.body.pan,
            "mobileno": req.body.mobileno
        },
        req.body.id)
        .then(function (result1) {
            index = 0;
            var receivedData = mongoFunctions.handleData(apiCalls.GET, collectionName, { truckno: 1 })
                .then((result) => {
                    res.send(result);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/bulkAdd', (req, res) => {
    arr = [];
    jsonData = []
    creator(req.files.name.name)
        .then((msgArr) => {
            for (i = 0; i < msgArr.length; i++) {
                let tempMsg = msgArr[i].split(';');

                arr.push({ 'truckno': tempMsg[0], 'oname': tempMsg[1], 'pan': tempMsg[2], 'mobile': '' })

            }
            setTimeout(() => {
                fs.readFile('tp.json', 'utf8', (err, data) => {
                    if (err) { throw err; }
                    jsonData = JSON.parse(data)
                    arr.forEach(element => {
                        jsonData.push(element);
                    });

                    fs.writeFile('tp.json', JSON.stringify(jsonData), 'utf8', (err, data) => {
                        if (err) { throw err; }
                        mongoFunctions.handleData(10, collectionName, {}, {}, jsonData)
                            .then(function (result) {

                                index = 0;
                                var receivedData = mongoFunctions.handleData(apiCalls.GET, 'ownerdetails', { truckno: 1 })
                                    .then((result1) => {
                                        res.send(result1);
                                    });
                            })
                            .catch((err) => {

                                res.send(err);

                            });

                    })
                })
            }, 5000);
        })
});

async function creator(dataFile) {
    console.log('E:\\Projects\\NODJS\\' + dataFile);

    tp = []
    var promise = new Promise((resolve, reject) => {
        var rd = readline.createInterface({
            input: fs.createReadStream('E:\\Projects\\NODJS\\' + dataFile),
            output: process.stdout,
            console: false
        });

        rd.on('line', function (line) {
            tp.push(line);
        });
        setTimeout(() => {
            resolve(tp);
        }, 5000);

    })
    return promise;
}

module.exports = router