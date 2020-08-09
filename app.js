//npm install cors
//npm install mongo
//npm install node
//npm install express

var exec = require('child_process').execFile;

var common_data = require('./SERVER/data.json');
var express = require(common_data.required.express);
var app = express();
app.use(express.static(__dirname));
var cors = require(common_data.required.cors)
app.use(cors());
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var apiCalls = common_data.APICALLS;
var excel = require('exceljs');
var fileupload = require("express-fileupload");
app.use(fileupload());


var mongoFunctions = require('./SERVER/mongoFunctions');
var addIndex = require('./SERVER/addIndex');
var advanceAccount = require('./SERVER/advanceAccount');
var BankDetails = require('./SERVER/BankDetails');
var BankName = require('./SERVER/BankName');
var booking = require('./SERVER/booking');
var bookingCashExpenses = require('./SERVER/bookingCashExpenses');
var CanaraBankNEFT = require('./SERVER/CanaraBankNEFT');
var CanaraBankPayment = require('./SERVER/CanaraBankPayment');
var CashExpenses = require('./SERVER/CashExpenses');
var change = require('./SERVER/change');
var chats = require('./SERVER/chats');
var count = require('./SERVER/count');
// var DontUse = require('./SERVER/DontUse');
var dailydata = require('./SERVER/dailydata');
var db = require('./SERVER/db');
var driverdetails = require('./SERVER/driverdetails');
var EmailEveryMonth = require('./SERVER/EmailEveryMonth');
var fileData = require('./SERVER/fileData');
var Finolex = require('./SERVER/Finolex');
var gstdetails = require('./SERVER/gstdetails');
var impgstdetails = require('./SERVER/impgstdetails');
var image = require('./SERVER/image')
var Information = require('./SERVER/Information');
var login = require('./SERVER/login');
var lrno = require('./SERVER/lrno');
var month = require('./SERVER/Month');
var NotificationBell = require('./SERVER/Notification');
var Owner = require('./SERVER/Owner');
var pochAccount = require('./SERVER/pochAccount');
var regularparty = require('./SERVER/regularparty');
var regularTruck = require('./SERVER/regularTruck');
var turnBook = require('./SERVER/turnBook');
var test = require('./SERVER/test');
var TPTHireDetails = require('./SERVER/TPTHireDetails');
var TruckBankDetails = require('./SERVER/TruckBankDetails');
var village = require('./SERVER/village');
// var SERVER = require('./SERVER/Server');try and use this
var BFFlag = 0;
var tempVar;

app.use('/addIndex', addIndex);
app.use('/advanceAccount', advanceAccount);
app.use('/bankDetails', BankDetails);
app.use('/bankName', BankName)
app.use('/booking', booking);
app.use('/bookingCashExpenses', bookingCashExpenses);
app.use('/CanaraBankNEFT', CanaraBankNEFT);
app.use('/CanaraBankPayment', CanaraBankPayment);
app.use('/cashExpenses', CashExpenses);
app.use('/change', change);
app.use('/chats', chats);
app.use('/Count', count);
// app.use('/', DontUse);
app.use('/dailyData', dailydata);
app.use('/db', db);
app.use('/driverDetails', driverdetails);
app.use('/EmailEveryMonth', EmailEveryMonth);
app.use('/fileData', fileData);
app.use('/Finolex', Finolex);
app.use('/gstDetails', gstdetails);
app.use('/impGstDetails', impgstdetails);
app.use('/image', image);
app.use('/Information', Information);
app.use('/login', login);
app.use('/lrno', lrno);
app.use('/month', month);
app.use('/notification', NotificationBell)
app.use('/ownerDetails', Owner);
app.use('/pochAccount', pochAccount);
app.use('/regularParty', regularparty);
app.use('/regularTruck', regularTruck);
app.use('/turnBook', turnBook);
app.use('/test', test);
app.use('/TPTHireDetails', TPTHireDetails);
app.use('/truckBankDetails', TruckBankDetails);
app.use('/Village', village);

app.listen(3000, function () {
    console.log(common_data.Messages.serverStartMsg);
});
// app.listen(3000, '172.31.38.24', function () {
//     console.log(common_data.Messages.serverStartMsg);
// });

app.post('/addImage', function (req, res, next) {
    console.log(req.files);
    res.send({ Status: 'done' })
});


// app.listen(3000, '172.31.19.155', function () {
//     console.log(common_data.Messages.serverStartMsg);
// });//old
// app.listen(3000, '172.31.37.236', function () {
//     console.log(common_data.Messages.serverStartMsg);
// });old


app.post('/finalMail', urlencodedParser, function (req, res) {
    var workbook1 = new excel.Workbook();
    var sheet1 = workbook1.addWorksheet('Time Pass');
    // 

    // MergeCells
    sheet1.mergeCells("B2:L3");
    sheet1.mergeCells("B4:L5");
    sheet1.mergeCells("B6:J7");
    sheet1.mergeCells("K6:L7");
    // MergeCells
    // Value
    sheet1.getCell('B2').value = 'NITIN ROADWAYS AND CARGO MOVERS';
    sheet1.getCell('B4').value = req.body.FileName.slice(0, -4) + '-' + req.body.FileName.slice(-4) + ' SALE AND EXPENSES ACCOUNT DETAILS';
    sheet1.getCell('B6').value = 'SALE';
    sheet1.getCell('K6').value = 'EXPENSES';
    sheet1.getRow(8).values = ['', 'Date', 'Lrno', 'From Party', 'From Party GST', 'Name Of Party', 'To Party GST', 'Truck No', '   Hire Amount', 'Place', 'Owner Name', 'PAN']
    sheet1.columns = [
        { key: 'hi', width: 10 },
        { key: 'Date', width: 10 },
        { key: 'lrno', width: 5 },
        { key: 'FromParty', width: 23 },
        { key: 'FromPartyGST', width: 17 },
        { key: 'nop', width: 23 },
        { key: 'ToPartyGST', width: 18 },
        { key: 'truckno', width: 14 },
        { key: 'hamt', width: 11 },
        { key: 'place', width: 13 },
        { key: 'OwnerName', width: 25 },
        { key: 'PAN', width: 13 },
    ];


    var receivedDate = mongoFunctions.handleData(req.body.dbName, 0, req.body.FileName, { 'Date': 1 })
        .then((result) => {
            for (i = 0; i < result.length; i++) {
                sheet1.addRow(result[i]);
            }
            // Value
            // Font
            sheet1.getCell('B2').font = {
                name: 'Calibri',
                size: 28,
                bold: true
            };
            sheet1.getCell('B4').font = {
                name: 'Calibri',
                size: 18,
                bold: true
            };
            sheet1.getCell('B6').font = {
                name: 'Calibri',
                size: 11,
                bold: true
            };
            sheet1.getCell('K6').font = {
                name: 'Calibri',
                size: 11,
                bold: true
            };
            sheet1.getRow(8).font = { name: 'Calibri', family: 4, size: 12, bold: true };
            // Font
            // Alignment
            sheet1.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet1.getCell('B4').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet1.getCell('B6').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet1.getCell('K6').alignment = { vertical: 'middle', horizontal: 'center' };
            // Alignment
            //Borders

            sheet1.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                if (rowNumber === 1) { } else {
                    ['B' + rowNumber, 'C' + rowNumber, 'D' + rowNumber, 'E' + rowNumber, 'F' + rowNumber, 'G' + rowNumber, 'H' + rowNumber, 'I' + rowNumber, 'J' + rowNumber, 'K' + rowNumber, 'L' + rowNumber].map(key => {
                        sheet1.getCell(key).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };

                    });
                }
            });

            //Borders
            workbook1.xlsx.writeFile('GST_ACCOUNT_DETAILS_' + req.body.FileName.slice(0, -4) + '_' + req.body.FileName.slice(-4) + '.xlsx').then(function (err) {

                if (err) {
                    return cb(err);
                }
                res.json('Done');
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

app.post('/finalMailSend', urlencodedParser, function (req, res) {
    var j = '';
    var spawn = require("child_process").spawn;
    const pyFile = 'chk1.py';
    const args = [req.body.FileName.slice(0, -4), req.body.FileName.slice(-4), req.body.Password];//this is not working s
    args.unshift(pyFile);
    var process = spawn('python', args);
    process.stdout.on('data', function (data) {
        j += data;
    })
    process.stdout.on('end',
        function () {
            res.json('Done');
        }
    );
});


app.post('/sendMail', urlencodedParser, function (req, res) {
    var i = 0;
    var j = '';
    var subject = req.body.Subject.toString();
    var body = req.body.Body.toString();

    fs.writeFile("Python/subject.txt", subject, (err) => {
        if (err) console.log(err);
    });

    fs.writeFile("Python/body.txt", body, (err) => {
        if (err) console.log(err);
    });

    var spawn = require("child_process").spawn;
    const pyFile = 'mail.py';
    const args = ['subject.txt', req.body.NameOfFIle.toString(), req.body.NameOfFIle.toString()];//this is not working s
    args.unshift(pyFile);
    var process = spawn('python', args);
    process.stdout.on('data', function (data) {
        j += data;
    })
    process.stdout.on('end',
        function () {
            res.json('Done');
        }
    );
})