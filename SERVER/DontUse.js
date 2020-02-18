var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var dbName=common_data.database.dbNameNRCM;

router.get('/DoNotUseThisApi', function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName,0, [collectionName])
        .then((data) => {

            data.forEach((element, index) => {

                changeDate(element)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            });
        })
        .catch((err) => {
            res.send(err);
        })
});

function updateDate(id, new_date) {
    var promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, client) {
            if (err) { console.log(common_data.Messages.error, err); }
            else {
                var db = client.db(dbName);
                db.collection([collectionName])
                    .update({ "_id": new mongodb.ObjectID(id) },
                        {
                            $set:
                                {
                                    'Date': new_date
                                }
                        }, function (result, err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(1);
                            }
                        })
            }
        });
    });
    return promise;
}

function changeDate(element) {
    var promise = new Promise((resolve, reject) => {
        var count = Object.keys(element.Date).length;
        console.log(count);
        var i = 0;
        var done = 0;
        if (count == 8) {
            var day = element.Date[0];
            var month = element.Date[2];
            var year = element.Date.slice(4, 8);
            var new_date = year + "-0" + month + "-0" + day;
            console.log(new_date);
            updateDate(element._id, new_date)
                .then((data) => {
                    if (data == 1) {
                        resolve("updated");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        if (count == 10) {
            var day = element.Date.slice(0, 2);
            var month = element.Date.slice(3, 5);
            var year = element.Date.slice(6, 10);
            var new_date = year + "-" + month + "-" + day;
            console.log(new_date);
            updateDate(element._id, new_date)
                .then((data) => {
                    if (data == 1) {
                        resolve("updated");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        if (count == 9) {
            if (element.Date.indexOf('-') == 1) {
                var day = element.Date[0];
                var month = element.Date.slice(2, 4);
                var year = element.Date.slice(5, 9);
                var new_date = year + "-" + month + "-0" + day;
                updateDate(element._id, new_date)
                    .then((data) => {
                        if (data == 1) {
                            resolve("updated");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            if (element.Date.indexOf('-') == 2) {
                var day = element.Date.slice(0, 2);
                var month = element.Date[3];
                var year = element.Date.slice(5, 9);
                var new_date = year + "-" + "0" + month + "-" + day;
                updateDate(element._id, new_date)
                    .then((data) => {
                        if (data == 1) {
                            resolve("updated");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    });
    return promise;
}

router.get('/DoNotUseThisApi2', function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName,0, 'AdvanceAccount', {}, { "Check": null })
        .then((data) => {

            data.forEach((element, index) => {

                changeCheckValue(element)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            });
        })
        .catch((err) => {
            res.send(err);
        })
});

function changeCheckValue(element) {
    var promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, client) {
            if (err) { console.log(common_data.Messages.error, err); }
            else {
                var db = client.db(dbName);
                db.collection("AdvanceAccount")
                    .update({ "_id": new mongodb.ObjectID(element._id) },
                        {
                            $set:
                                {
                                    'Check': false
                                }
                        }, function (result, err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(1);
                            }
                        })
            }
        });
    });
    return promise;
}

module.exports = router