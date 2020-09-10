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



//truckno: "MH12 LT 2424", oname: "Santosh Ram Parihar", pan: "BEWPP1875F", mobileno: ""}
//truckno: "MH13 AX 4870", oname: "Jalindar Devidas Shinde", pan: "GCSPS2972D", mobileno: ""}
//truckno: "TN25 BJ 0271", oname: "G Periyasamy", pan: "CWSPP9905M", mobileno: "9999999999"}
//truckno: "TN24 AD 2050", oname: "Seetharaman", pan: "CVCPS4951H", mobileno: "9900000000"}
//truckno: "TN38 CL 4044", oname: "K Haridass", pan: "ATSPG7904Q", mobileno: "9900000000"}
//truckno: "TN74 AB 8314", oname: "R Ananathurai", pan: "ASZPA1240M", mobileno: "9900000000", …}
//truckno: "MH45 AF 6969", oname: "Appa kolekar", pan: "GLGPK8494F", mobileno: "9999999999", …}
//truckno: "TN23 BM 4504", oname: "E Shadrack", pan: "FAPPS3814A", mobileno: "9999999999", …}
//truckno: "TN23 BM 4504", oname: "E Shadrack", pan: "FAPPS3814A", mobileno: "9999999999", …}
//truckno: "TN63 AM 8607", oname: "G KarthikRaja", pan: "BPEPK4505G", mobileno: "9999999999", …}
// truckno: "TN59 CZ 3790", oname: "P Nagajothi", pan: "AIWPN6225A", mobileno: "9999999999", …}
// truckno: "TN58 AL 4973", oname: "K Marimuthu", pan: "AFCPM2914G", mobileno: "9999999999"}
// truckno: "TN32 AA 0524", oname: "S Deivanayagan", pan: "BHNPD6701J", mobileno: "9999999999"}
// truckno: "TN12 U 7707", oname: "P Kalaiselvam", pan: "AUMPK1050F", mobileno: "9999999999"}
// truckno: "TN18 AP 4579", oname: "P Kalaiselvam", pan: "AUMPK1051F", mobileno: "9999999999"}
// truckno: "TN57 BH 9570", oname: "P Selvam", pan: "CPDPS2239K", mobileno: "9999999999"}
// truckno: "TN54 S 7893", oname: "K R Ramesh", pan: "AOYPR8825G", mobileno: "9999999999"}
// truckno: "TN54 S 7893", oname: "K R Ramesh", pan: "AOYPR8825G", mobileno: "9999999999"}
// truckno: "TN34 S 8844", oname: "M Mayil Samy", pan: "BSFPM3128M", mobileno: "9999999999"}
// truckno: "TN42 AD 2387", oname: "Murugesan Muthu", pan: "CZFPM4894J", mobileno: "9999999999"}
// truckno: "TN56 H 8357", oname: "Jeyavel Thangan P", pan: "BEOPJ8270A", mobileno: "9999999999"}
// truckno: "TN54 S 1096", oname: "M Susila", pan: "CMCPS2207P", mobileno: "9999999999"}
// truckno: "TN34 S 8844", oname: "M Mayil Samy", pan: "BSFPM3128M", mobileno: "9999999999"}
// truckno: "TN92 C 5315", oname: "Anand Selvaraj", pan: "DBQPA8460J", mobileno: "9999999999"}
// truckno: "TN92 C 2619", oname: "Sarvanan A Lagirisamy", pan: "JHUPS4044A", mobileno: "9999999999"}
// truckno: "TN92 C 7044", oname: "Veeraputhiran Poranal", pan: "BNVPV2890L", mobileno: "9999999999"}
// truckno: "TN24 AT 0517", oname: "Manikundan V", pan: "BSOPV7579J", mobileno: "9999999999"}
// truckno: "TN66 AB 3574", oname: "Ayyaparaja", pan: "DGPPA0584K", mobileno: "9900000000"}
// truckno: "MH45 AF 2212", oname: "Chavan Ashok Bapu", pan: "ASVPC7760Q", mobileno: "9999999999"}
// truckno: "MH13 CU 5590", oname: "Dattatraya Lendave", pan: "AQFPL6525L", mobileno: "9999999999"}
