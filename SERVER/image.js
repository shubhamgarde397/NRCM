var express = require('express')
var app = express();
var fileupload = require("express-fileupload");
var fs = require('fs');

app.use(fileupload());

var router = express.Router()

router.post('/addImage', function (req, res, next) {

    console.log(req.body);

    var dir = 'E:/Projects/NRCM/imagesUpload/' + req.body.name;

    if (!fs.existsSync(dir)) {
        console.log('keli', dir);
        fs.mkdirSync(dir);
    }

    const file = req.files.image;
    console.log(dir);

    file.mv(dir + '/' + file.name, (err, resi) => {
        if (err) {
            throw err;
        }
        else {
            res.send({ Status: 'done' })
        }
    })

});




module.exports = router