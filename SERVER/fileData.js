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
var apiCalls = common_data.APICALLS;
var API = common_data.APIS.fileData;
var fs = require('fs');
const readline = require('readline');
var jsonArray = [];
var first;
var second;
var firstLength;
var secondLength;
var appendingArray = [];


__fileName__ = '/Users/shubham.nitin.garde/Downloads/'


router.post('/getFile', urlencodedParser, function (req, res) {
    console.log(req.body);
    first = req.body.FName;
    second = req.body.SName;
    firstLength = first.length;
    secondLength = second.length;
    // fs.readFile(__fileName__ + req.body.file, (err, data) => {
    //     if (err) throw err;
    //     console.log(data.toString('utf8'));
    // });


    const rl = readline.createInterface({
        input: fs.createReadStream(__fileName__ + req.body.file),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        pushingTextToJSON(line); // send the response to frontend
    });
});

function pushingTextToJSON(line) { //returns appending array after whole file is read
    tempTime = line.slice(10, 15).toString();
    tempSingleMinute = parseInt(tempTime.slice(2, 3))
    if (isNaN(tempSingleMinute) === true) {
        tempSingleMinute = parseInt(tempTime.slice(3, 4))
        if (isNaN(tempSingleMinute)) {
            // console.log('gone case')
            nameChecker(line, 0, 0, 0); // after getting true append a new object in appendingArray if got false, append the data to the last previous object
            // let a function do that work
        } else {
            // console.log('not a bad case huge crap', line);
            nameChecker(line, 21, firstLength, secondLength);
        }
    } else {
        nameChecker(line, 20, firstLength, secondLength);
        // console.log('not a bad case', line);
    }
}

function nameChecker(lineData, defaultLenght, firstLengthTemp, secondLengthTemp, ) { // return if the line consists of shubhamgarde or Suyash 
    if (lineData.slice(defaultLenght, defaultLenght + firstLength) === first) {
        // console.log(appendingArray++, ' : ', lineData.slice(defaultLenght, defaultLenght + firstLengthTemp));
        return true;
    } else if (lineData.slice(defaultLenght, defaultLenght + secondLengthTemp) === second) {
        // console.log(appendingArray++, ' : ', lineData.slice(defaultLenght, defaultLenght + secondLengthTemp));
        return true;
    }
    else {
        return false;
        // console.log(appendingArray++, ' : ', 'yo');
    }

}


module.exports = router