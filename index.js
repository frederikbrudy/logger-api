/**
 * Created by Frederik Brudy (fbrudy.net)
 */
var express    = require('express')
    , app = express()
    , http = require('http').Server(app)
    , fs = require('fs')
    , path = require('path')
    , dateFormat = require('dateformat')
    , morgan          = require('morgan')
    , bodyParser      = require('body-parser')
    , methodOverride  = require('method-override');

//a new file will be cretaed whenever this application starts new
var filename = 'log-'+dateFormat(new Date(), 'yyyy-dd-mm-HH.MM.ss')+'.txt';
//filename = 'log-group1.txt'; //or use this to override the filename and always log to this file.

var port = false; //the port for this application to run on. If set to false, a default port is used

app.use(morgan('dev'));                                             // log every request to the console
app.use(bodyParser.urlencoded({limit: '5mb', extended:'true'}));   // parse application/x-www-form-urlencoded
app.use(methodOverride());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(express.static(path.resolve(__dirname, 'public')));

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

app.post('/log', function (req, res) {
    //res.send('Hello World!');
    if(typeof req.body.line !== 'undefined' || typeof req.body.data !== 'undefined') {
        var logLine = '';
        if (typeof req.body.line !== 'undefined') {
            logLine = req.body.line;
            if (!logLine.endsWith('\n')) {
                logLine += '\n';
            }
        }
        if (typeof req.body.data !== 'undefined') {
            logLine += JSON.stringify(req.body.data);
        }
        if (!logLine.endsWith('\n')) {
            logLine += '\n';
        }
        fs.appendFile(path.join(__dirname, filename), logLine, function (err) {
            if (err) throw err;
            res.json({message: 'log ok'});
        });
    }
    else {
        res.status(500).json({message: 'missing input'});
    }
});

app.get('/', function (req, res) {
    res.send('Logger aplication which accepts <code>line</code> fields in the POST body to endpoint <code>/log</code>');
});

var server = http.listen(port || 3002, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});