var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var apiCalls = common_data.APICALLS;
var tableArray = common_data.tables;
commonObjectSend = {};

router.post('/getCommonInformation', urlencodedParser, function (req, res) {
    let index = 0;
    commonArray = [];
    tableArray[0].forEach((element) => {
        var receivedData = mongoFunctions.handleData(apiCalls.GET, element, getSorted(element))
            .then((result) => {
                commonObjectSend[element.toString()] = result;
                index = index + 1;
                if (index === 7) {

                    setTimeout(() => {
                        res.send(commonObjectSend);
                    }, 5000);


                }
            })
            .catch((err) => {
                res.send(err);
            });
    });
});

function getSorted(data) {
    switch (data) {
        case 'BankDetails':
            return { Name: 1 };
        case 'BankNames':
            return { bankname: 1 };
        case 'driverdetails':
            return { truckno: 1 };
        case 'gstdetails':
            return { name: 1 };
        case 'impgstdetails':
            break;
        case 'ownerdetails':
            return { truckno: 1 };
        case 'regularparty':
            return { name: 1 };
        case 'RegularTruck':
            return { regulartruck: 1 };
        case 'TruckBankDetails':
            return { truckno: 1 };
        case 'villagenames':
            return { village_name: 1 };
    }
}


module.exports = router




