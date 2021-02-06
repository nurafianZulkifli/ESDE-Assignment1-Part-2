
const express = require('express');
const serveStatic = require('serve-static');

const cors = require('cors');

var app = express();

// HTTPS
// const https = require('https')
// const fs = require('fs')
// const path = require('path')
const RateLimit = require('express-rate-limit');

var hostname = "localhost";
var port = 3001;

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// }, app)

// sslServer.listen(3001, () => console.log(`Server hosted at https://${hostname}:${port}`))



// Limit rate of refresh
app.enable('trust proxy');

const apiLimiter = new RateLimit({
    windowMs: 60000, // 1 minute
    max: 100, //max 100 requests
    message: "Too many requests, please try again later." //error to be shown
});

// Applies to whole website
app.use('/', apiLimiter);

app.use(cors());


app.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);
    //Checking the incoming request type from the client
    if (req.method != "GET") {
        res.type('.html');
        var msg = '<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    } else {
        next();
    }
});


app.use(serveStatic(__dirname + "/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
    res.header("Access-Control-Allow-Origin", "http://3.231.214.204:3001");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
});


// Deprecated, as a result of HTTPS implementation
app.listen(port,'0.0.0.0',hostname,function(){
console.log(`Server hosted at http://${hostname}:${port}`);
});