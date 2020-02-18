var express = require('express')
var router = express.Router()
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var fs = require('fs');
var fs = require('fs'),
    readline = require('readline');
var msgArr = [];

router.post('/getChat', urlencodedParser, function (req, res) {
    fs.readFile('chats.json', 'utf8', (err, data) => {
        if (err) { throw err; }
        jsonData = JSON.parse(data)
        res.send(jsonData);
    })
});

router.post('/writeChat', urlencodedParser, function (req, res) {
    jsonData = []

    fs.readFile('chats.json', 'utf8', (err, data) => {
        if (err) { throw err; }
        jsonData = JSON.parse(data)
        req.body.data.reverse().forEach(element => {
            jsonData.unshift(element);
        });

        fs.writeFile('chats.json', JSON.stringify(jsonData), 'utf8', (err, data) => {
            if (err) { throw err; }
            res.send({ "Status": "done" });

        })
    })

});

router.post('/advanced', urlencodedParser, (req, res) => {
    // num = JSON.parse(req.body.numbers);
    console.log(req.body.numbers);
    num = req.body.numbers;


    counter = 0;
    arr = [];
    jsonData = []
    creator()
        .then((data) => {
            msgArr = data.reverse();
            for (i = 0; i < num.length; i++) {
                for (j = 0; j < msgArr.slice(counter, counter + num[i]).length; j++) {
                    if (i % 2 == 0) {
                        arr.push({ 'Name': 'dgdgdg', 'Text': msgArr.slice(counter, counter + num[i])[j] })
                    }
                    else {
                        arr.push({ 'Name': 'Sense', 'Text': msgArr.slice(counter, counter + num[i])[j] })
                    }
                }
                counter = counter + num[i];
            }
            setTimeout(() => {
                fs.readFile('chats.json', 'utf8', (err, data) => {
                    if (err) { throw err; }
                    jsonData = JSON.parse(data)
                    arr.forEach(element => {
                        jsonData.unshift(element);
                    });

                    fs.writeFile('chats.json', JSON.stringify(jsonData), 'utf8', (err, data) => {
                        if (err) { throw err; }
                        res.send({ "Status": "done" });

                    })
                })
            }, 5000);


        })

});

async function creator() {
    tp = []
    var promise = new Promise((resolve, reject) => {
        var rd = readline.createInterface({
            input: fs.createReadStream('OurChat.txt'),
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