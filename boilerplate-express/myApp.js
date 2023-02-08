let express = require('express');
let app = express();
require('dotenv').config();
const msg = {"message": "Hello json"};
//console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    if(process.env.MESSAGE_STYLE === 'uppercase') {
        msg.message = msg.message.toUpperCase();
    }; 
        res.json(msg);
});

app.use('/public', express.static(__dirname + '/public'));

module.exports = app;