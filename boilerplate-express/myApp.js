let express = require('express');
const bodyParser = require('body-parser');
let app = express();
require('dotenv').config();
const msg = {"message": "Hello json"};
//console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    //   let str = req.method + " " + req.path + " - " + req.ip;
    //   console.log(str);
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    console.log("Hello World");
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    if(process.env.MESSAGE_STYLE === 'uppercase') {
        msg.message = msg.message.toUpperCase();
    }; 
    res.json(msg);
});

app.get('/now', (req, res, next) => {
    const newTime = new Date().toString();
    req.time = newTime;
    next();
    }, 
        (req, res) => {
            res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word});
});

app.get('/name', (req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    //const {first: firstName, last: lastName} = req.query;
    res.json({name: `${firstName} ${lastName}`});
});

//http://localhost:3000/name?first=Mick&last=Jagger
//http://localhost:3000/name?first=Keith&last=Richards

app.post('/name', (req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    //const {first: firstName, last: lastName} = req.query;
    res.json({name: `${firstName} ${lastName}`});
});

module.exports = app;