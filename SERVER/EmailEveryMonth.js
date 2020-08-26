var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
var excel = require('exceljs');
router.use(bodyParser.json());

router.post('/download', urlencodedParser, function (req, res) {
    res.download(__dirname + '/' + req.body.toReceive + '.xlsx');
});

router.post('/dowloadExcel', urlencodedParser, function (req, res) {
    var workbook1 = new excel.Workbook();
    var sheet1 = workbook1.addWorksheet('Time Pass');
    sheet1.getRow(3).values = ['', 'Date', 'Particulars', 'Destination', 'TruckNo', 'LRNO', 'Amount'];
    sheet1.columns = [
        { key: 'hi', width: 10 },
        { key: 'date', width: 10 },
        { key: 'particulars', width: 10 },
        { key: 'dest', width: 10 },
        { key: 'truckNo', width: 10 },
        { key: 'lrno', width: 10 },
        { key: 'amount', width: 10 },
    ];
    if (Number.isNaN(parseInt(req.body[0].BFDetails.BF))) {
        tempVar = 0;
        BFFlag = 0;
    }
    else {
        BFFlag = 1;
        sheet1.mergeCells("B4:F4");
        sheet1.getCell('B4').value = req.body[0].BFDetails.BFMsg;
        sheet1.getCell('G4').value = req.body[0].BFDetails.BF;
        tempVar = parseInt(req.body[0].BFDetails.BF);
    }
    // excel
    for (i = 0; i < req.body[1].AccountDetails.length; i++) {
        sheet1.addRow(req.body[1].AccountDetails[i]);
    }
    for (j = 0; j < req.body[1].AccountDetails.length; j++) {
        tempVar = tempVar + parseInt(req.body[1].AccountDetails[j]['amount']);
    }
    sheet1.getCell('F' + String(4 + BFFlag + req.body[1].AccountDetails.length)).value = 'Total Amount';
    sheet1.getCell('G' + String(4 + BFFlag + req.body[1].AccountDetails.length)).value = tempVar;

    if (req.body[2].PaymentDetails.length === 0) { } else {
        let tempVarNew = 0;
        for (i = 0; i < req.body[2].PaymentDetails.length; i++) {
            sheet1.addRow(req.body[2].PaymentDetails[i]);
        }
        for (j = 0; j < req.body[2].PaymentDetails.length; j++) {
            tempVarNew = tempVarNew + parseInt(req.body[2].PaymentDetails[j]['amount']);
        }
        sheet1.getCell('F' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + req.body[2].PaymentDetails.length)).value = 'Total Received';//#f1c232
        sheet1.getCell('G' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + req.body[2].PaymentDetails.length)).value = tempVarNew;//#f1c232
        sheet1.getCell('F' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + 1 + req.body[2].PaymentDetails.length)).value = 'Balance';//#9fc5e8
        sheet1.getCell('G' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + 1 + req.body[2].PaymentDetails.length)).value = tempVar - tempVarNew;//#9fc5e8
        //excel


    }
    //Borders

    sheet1.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        if (rowNumber === 1 || rowNumber === 2) { } else {
            ['B' + rowNumber, 'C' + rowNumber, 'D' + rowNumber, 'E' + rowNumber, 'F' + rowNumber, 'G' + rowNumber].map(key => {
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
    //Color
    if (req.body[2].PaymentDetails.length === 0) { } else {
        sheet1.getCell('F' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + 1 + req.body[2].PaymentDetails.length)).fill = color('009FC5E8');
        sheet1.getCell('G' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + 1 + req.body[2].PaymentDetails.length)).fill = color('009FC5E8');
    }
    sheet1.getCell('B3').fill = color('00B7E1CD');
    sheet1.getCell('C3').fill = color('00B7E1CD');
    sheet1.getCell('D3').fill = color('00B7E1CD');
    sheet1.getCell('E3').fill = color('00B7E1CD');
    sheet1.getCell('F3').fill = color('00B7E1CD');
    sheet1.getCell('G3').fill = color('00B7E1CD');
    sheet1.getCell('F' + String(4 + BFFlag + req.body[1].AccountDetails.length)).fill = color('00B7E1CD');
    sheet1.getCell('F' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + req.body[2].PaymentDetails.length)).fill = color('00F1C232');
    sheet1.getCell('G' + String(req.body[1].AccountDetails.length + 0 + 4 + BFFlag + req.body[2].PaymentDetails.length)).fill = color('00F1C232');


    //Colors


    workbook1.xlsx.writeFile(req.body[3].toReceive + '.xlsx').then(function (err) {
        if (err) {
            res.send('Done');
        }
        res.send('Done');
    });
});

function color(colour) {
    return {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colour },
        bgColor: { argb: '00FFFFFF' }
    }
}

router.post('/sendFile', urlencodedParser, function (req, res) {
    var j = '';
    var spawn = require("child_process").spawn;
    const pyFile = 'chk.py';
    const args = [req.body[3].toReceive, req.body[4].Password];
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

module.exports = router