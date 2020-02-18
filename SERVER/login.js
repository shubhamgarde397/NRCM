var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongodb = require(common_data.required.mongodb);
var mongoClient = mongodb.MongoClient;
const url = common_data.required.url;
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var dbName = common_data.database.dbNameInformation;
var collectionName = common_data.table_name.login;
var apiCalls = common_data.APICALLS

router.post('/getLoginDetailsbyid', urlencodedParser, function (req, res) {
    var arr = { status: false };
    var status = false;
    var AUTHCode = 0;
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(common_data.Messages.error, err);
        }
        else {
            var tempDB = req.body.dbName;
            var db = client.db(tempDB.toString());
            var c = db.collection(collectionName).find({ $and: [{ "username": req.body.username }, { "password": req.body.password }] }).count();

            c.then(function (result) {
                if (result == 0) {
                    return res.json({ status: false });
                }
                else {
                    mongoFunctions.handleData('NRCM_Information', apiCalls.GET, collectionName, {}, { $and: [{ "username": req.body.username }, { "password": req.body.password }] })
                        .then(function (result) {
                            if (result[0].AUTH) {
                                AUTHCode = 1;
                            } else {
                                AUTHCode = 0;
                            }
                            return res.json({ status: true, AUTH: AUTHCode });
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                }
                client.close();
            })
        }
    });
});

router.post('/addnewuserdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router